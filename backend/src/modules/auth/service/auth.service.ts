import { LoginDTO } from './../dto/login.dto';
import { responceData } from './../../../utils/responce-data.util';
import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponceData } from 'src/model/responce-data.model';
import { SignUpDTO } from '../dto/signup.dto';
import { ChangePasswordDTO } from '../dto/changePassword.dto';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(userCredential: SignUpDTO): Promise<ResponceData> {
    try {
      const hashedPassword = await hash(
        userCredential.password,
        Number(process.env.HASH_ROUNDS),
      );
      userCredential.password = hashedPassword;

      const user = await this.userRepository.save(userCredential);

      return responceData('Sign Up Success', HttpStatus.CREATED);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User Already Exist');
      }
      throw new InternalServerErrorException();
    }
  }

  async signin(userCredential: LoginDTO): Promise<ResponceData> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: userCredential.email },
        select: ['id', 'email', 'password'],
      });

      if (
        user &&
        (await this.comparePassword(userCredential.password, user.password))
      ) {
        const payload = { email: user.email, id: user.id };
        const token = this.jwtService.sign(payload);

        return responceData('Login Success', HttpStatus.OK, { token });
      }

      throw new UnauthorizedException('Invalid Credentials');
    } catch (error) {
      if (error.status === HttpStatus.UNAUTHORIZED) {
        throw new UnauthorizedException('Invalid Credentials');
      }
      throw new InternalServerErrorException();
    }
  }

  async changePassword(userCredential: Partial<ChangePasswordDTO>) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: userCredential.email },
        select: ['id', 'password'],
      });

      if (!user) {
        throw new BadRequestException('Invalid Email or Password');
      }

      const isPasswordCorrect = await this.comparePassword(
        userCredential.password,
        user.password,
      );

      if (!isPasswordCorrect) {
        throw new BadRequestException('Invalid Email or Password');
      }

      const hashedPassword = await hash(
        userCredential.newPassword,
        Number(process.env.HASH_ROUNDS),
      );

      const updateRes = await this.userRepository.update(user.id, {
        password: hashedPassword,
      });

      if (updateRes.affected) {
        const data = await this.userRepository.findOne({
          where: { email: userCredential.email },
        });

        return responceData('Password Update Success', HttpStatus.OK, data);
      } else {
        throw new InternalServerErrorException();
      }
    } catch (error) {
      if (error.status === HttpStatus.BAD_REQUEST) {
        throw new BadRequestException('Invalid Email or Password');
      }
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  private async comparePassword(
    password: string,
    hassedPassword: string,
  ): Promise<boolean> {
    return await compare(password, hassedPassword);
  }
}
