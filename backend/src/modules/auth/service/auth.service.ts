import { LoginDTO } from './../dto/login.dto';
import { responceData } from './../../../utils/responce-data.util';
import {
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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(userCredential: SignUpDTO): Promise<ResponceData> {
    try {
      const user = this.userRepository.create(userCredential);
      await user.save();

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

      if (user && (await user.comparePassword(userCredential.password))) {
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
}
