import { map, switchMap, catchError } from 'rxjs/operators';
import { from, Observable, of, throwError } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/model/user.model';
import { UserEntity } from '../../user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService
    ) { }

    signup(user: User): Observable<User> {
        return this.hashPassword(user.password).pipe(
            switchMap((hashPassword: string) => {
                const newUserObj: User = this.userRepository.create({ ...user });  //create method is equal to  new User()
                newUserObj.password = hashPassword;

                return from(this.userRepository.save(newUserObj)).pipe(
                    map((data) => {
                        const { password, ...result } = data;
                        return result;
                    }),
                    catchError(error => throwError(error))
                );
            })
        );
    }


    private generateJWT(user: User): Observable<string> {
        return from(this.jwtService.signAsync({ user }));
    }

    private hashPassword(password: string): Observable<string> {
        return from<string>(bcrypt.hash(password, 12));
    }

    private comparePassword(hashPassword: string, password: string): Observable<any | boolean> {
        return of(bcrypt.compare(hashPassword, password));
    }
}
