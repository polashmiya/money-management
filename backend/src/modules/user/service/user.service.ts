import { hash } from 'bcrypt';
import { UpdateUserDto } from './../dto/user.dto';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { responceData } from 'src/utils/responce-data.util';
import { ChangePasswordDTO } from 'src/modules/auth/dto/changePassword.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll() {
    try {
      const [users, count] = await this.userRepository.findAndCount({});
      const data = { users, total: count };

      return responceData('Get User Success', HttpStatus.OK, data);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getById(id: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        return new NotFoundException('User Not Found');
      }

      return responceData('Get User Success', HttpStatus.OK, user);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, user: UpdateUserDto) {
    try {
      const updateRes = await this.userRepository.update(id, user);

      if (updateRes.affected) {
        const findUser = await this.userRepository.findOne({ where: { id } });
        return responceData('Update User Success', HttpStatus.OK, findUser);
      } else {
        return new BadRequestException('Update User Failed');
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async delete(id: string) {
    try {
      const res = await this.userRepository.delete(id);

      if (res.affected) {
        return responceData('Delete User Success', HttpStatus.OK, res);
      } else {
        return new BadRequestException('Delete User Failed');
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async changePassword(userCredential: Partial<ChangePasswordDTO>, user: User) {
    try {
      if (userCredential.password === userCredential.newPassword) {
        return new BadRequestException(
          "New Password can't be the same as old Password",
        );
      }

      const userRes = await this.userRepository.findOne({
        where: { email: user.email },
        select: ['id', 'password'],
      });

      if (!userRes) {
        return new BadRequestException('Invalid Email or Password');
      }

      const isPasswordCorrect = await userRes.comparePassword(
        userCredential.password,
      );

      if (!isPasswordCorrect) {
        return new BadRequestException('Invalid Email or Password');
      }

      const hashedPassword = await hash(
        userCredential.newPassword,
        Number(process.env.HASH_ROUNDS),
      );

      const updateRes = await this.userRepository.update(userRes.id, {
        password: hashedPassword,
      });

      if (updateRes.affected) {
        const data = await this.userRepository.findOne({
          where: { email: user.email },
        });

        return responceData('Password Update Success', HttpStatus.OK, data);
      } else {
        return new BadRequestException();
      }
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
}
