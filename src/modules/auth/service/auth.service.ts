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

    signin(user: User): Observable<string | Error> {
        return this.verifyUser(user.email, user.password).pipe(
            switchMap((user: User) => {
                if (user) {
                    return this.generateJWT(user).pipe(map((jwtToken: string) => jwtToken));
                }
            }),
            catchError(error => throwError(error))
        );
    }

    private verifyUser(email: string, password: string): Observable<User | Error> {
        return from(this.userRepository.findOne({ email })).pipe(
            switchMap((user: User) => {
                if (user) {
                    return this.comparePassword(password, user.password).pipe(
                        map((isMatch: boolean) => {
                            if (isMatch) {
                                const { password, ...result } = user;
                                return result;
                            } else {
                                throw Error("Invalid Credential");
                            }
                        })
                    )
                } else {
                    throw Error("Invalid Credential");
                }
            }),
        );
    }


    private generateJWT(user: User): Observable<string> {
        return from(this.jwtService.signAsync({ user }));
    }

    private hashPassword(password: string): Observable<string> {
        return from<string>(bcrypt.hash(password, 12));
    }

    private comparePassword(password: string, hashPassword: string): Observable<boolean | any> {
        return from<boolean | any>(bcrypt.compare(password, hashPassword));
    }
}
