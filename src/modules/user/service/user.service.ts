import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user.model';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  getAll(): Observable<User[]> {
    return from(this.userRepository.find({})).pipe(
      map((users: User[]) => {
        users.forEach((user: User) => {
          delete user.password;
          return user;
        });

        return users;
      }),
    );
  }

  getById(id: string): Observable<User> {
    return from(this.userRepository.findOne(id)).pipe(
      map((user) => {
        delete user.password;
        return user;
      }),
    );
  }

  update(id: string, user: User) {
    delete user.email;
    delete user.password;

    return from(this.userRepository.update(id, user));
  }

  delete(id: string): Observable<any> {
    return from(this.userRepository.delete(id));
  }
}
