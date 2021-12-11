import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Put,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { UpdateUserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';
import { ChangePasswordDTO } from 'src/modules/auth/dto/changePassword.dto';
import { GetUser } from 'src/modules/auth/decorator/user.decorator';
import { User } from '../entity/user.entity';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    try {
      return this.userService.getAll();
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    try {
      return this.userService.getById(id);
    } catch (error) {
      return error;
    }
  }

  @Put('changePassword')
  @ApiBody({ type: ChangePasswordDTO })
  changePassword(
    @Body(ValidationPipe) body: Partial<ChangePasswordDTO>,
    @GetUser() user: User,
  ) {
    try {
      return this.userService.changePassword(body, user);
    } catch (error) {
      return error;
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    try {
      return this.userService.update(id, user);
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.userService.delete(id);
    } catch (error) {
      return error;
    }
  }
}
