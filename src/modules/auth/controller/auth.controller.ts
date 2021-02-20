import { Observable, of } from 'rxjs';
import { User } from '../../user/model/user.model';
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { map, catchError } from 'rxjs/operators';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('signup')
    create(@Body() user: User): Observable<User | Object> {
        return this.authService.signup(user).pipe(
            map((user: User) => user),
            catchError(err => of({ error: err.message }))
        );
    }

    @Post('signin')
    signin(@Body() user: User): Observable<Object> {
        return this.authService.signin(user).pipe(
            map((jwtToken: string) => ({ "x-auth-token": jwtToken })),
            catchError(err => of({ error: err.message }))
        );
    }

}
