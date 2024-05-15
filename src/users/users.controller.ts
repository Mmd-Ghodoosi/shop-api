import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Session,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { userDto } from './Dto/user-dto';
import { UserEditDto } from './Dto/userEdit-dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('createUser')
  async createUser(@Body() body: userDto, @Session() session: any) {
    const user = await this.userService.CreateUser(body.email, body.password);
    session.userId = user.id;
    if (user) return 'User has been created';
  }
  @Get('findAUser/:id')
  async findAUser(@Param('id') id: string) {
    const user = await this.userService.FindAUser(id);
    if (!user) {
      throw new NotFoundException('There is no user with this id');
    }
    return user;
  }
  @Delete('deleteUser/:id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.userService.deleteUser(id);
    if (!user) {
      throw new NotFoundException('There is no user with this id');
    }
    return 'User has been deleted';
  }
  @Put('editUser/:id')
  async editUser(@Param('id') id: string, @Body() body: UserEditDto) {
    const user = await this.userService.EditUser(id, body);
    if (!user) {
      throw new NotFoundException('There is no user with this id');
    }
    return 'User has been updated';
  }
}
