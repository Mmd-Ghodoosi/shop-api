import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Session,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Serialize } from 'interceptor/user-interceptor';
import { UserExpose } from './Dto/user-expose';
import { UsersService } from './users.service';
import { userDto } from './Dto/user-dto';
import { UserEditDto } from './Dto/userEdit-dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './deconator/currentUser';
import { AuthGuard } from 'Guard/auth.guard';

@Controller('users')
@Serialize(UserExpose)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('currentUser')
  @UseGuards(AuthGuard)
  currentUser(@CurrentUser() user: string) {
    return user;
  }

  @Get('signout')
  async signout(@Session() session: any) {
    session.userId = null;
    return 'logged out';
  }

  @Post('signup')
  async signup(@Body() body: userDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    if (user) return 'User has been created';
  }

  @Post('signin')
  async signin(@Body() body: userDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    if (user) return 'User has been signed in';
  }

  @Get('findAUser/:id')
  async findAUser(@Param('id') id: string) {
    const user = await this.userService.FindAUser(id);
    if (!user) {
      throw new NotFoundException('There is no user with this id');
    }
    return user;
  }
  @Get('findUsers')
  async findUsers(@Query('email') email: string) {
    const user = await this.userService.FindUsers(email);
    if (!user) {
      throw new NotFoundException('There is no user');
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
