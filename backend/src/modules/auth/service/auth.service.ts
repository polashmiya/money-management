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
import { User } from '../../user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDTO } from '../dto/signup.dto';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(userCredential: SignUpDTO) {
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

  async signin(userCredential: LoginDTO) {
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

      return new UnauthorizedException('Invalid Credentials');
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
