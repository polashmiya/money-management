import { Observable, of } from 'rxjs';
import { Body, Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { catchError, map } from 'rxjs/operators';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    getAll(): Observable<User[]> {
        return this.userService.getAll();
    }

    @Get(':id')
    getById(@Param('id') id: string): Observable<User> {
        return this.userService.getById(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() user: User): Observable<any> {
        return this.userService.update(id, user);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<User> {
        return this.userService.delete(id);
    }
}
