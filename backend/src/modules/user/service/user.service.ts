import { hash } from 'bcrypt';
import { UpdateUserDto } from './../dto/user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponceData } from 'src/model/responce-data.model';
import { responceData } from 'src/utils/responce-data.util';
import { ChangePasswordDTO } from 'src/modules/auth/dto/changePassword.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<ResponceData> {
    try {
      const [users, count] = await this.userRepository.findAndCount({});
      const data = { users, total: count };

      return responceData('Get User Success', HttpStatus.OK, data);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getById(id: string): Promise<ResponceData> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException();
      }

      return responceData('Get User Success', HttpStatus.OK, user);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException('User Not Found');
      }
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, user: UpdateUserDto): Promise<ResponceData> {
    try {
      const updateRes = await this.userRepository.update(id, user);

      if (updateRes.affected) {
        const findUser = await this.userRepository.findOne({ where: { id } });
        return responceData('Update User Success', HttpStatus.OK, findUser);
      } else {
        throw new BadRequestException();
      }
    } catch (error) {
      if (error.status === HttpStatus.BAD_REQUEST) {
        throw new BadRequestException('Update User Failed');
      }
      throw new InternalServerErrorException();
    }
  }

  async delete(id: string) {
    try {
      const res = await this.userRepository.delete(id);

      if (res.affected) {
        return responceData('Delete User Success', HttpStatus.OK, res);
      } else {
        throw new BadRequestException();
      }
    } catch (error) {
      if (error.status === HttpStatus.BAD_REQUEST) {
        throw new BadRequestException('Delete User Failed');
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

      const isPasswordCorrect = await user.comparePassword(
        userCredential.password,
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
}
