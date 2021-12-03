import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Put,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { ResponceData } from 'src/model/responce-data.model';
import { UpdateUserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';
import { ChangePasswordDTO } from 'src/modules/auth/dto/changePassword.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(): Promise<ResponceData> {
    return this.userService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<ResponceData> {
    return this.userService.getById(id);
  }

  @Put('changePassword')
  @ApiBody({ type: ChangePasswordDTO })
  changePassword(@Body(ValidationPipe) body: Partial<ChangePasswordDTO>) {
    try {
      return this.userService.changePassword(body);
    } catch (error) {
      return error;
    }
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<ResponceData> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
