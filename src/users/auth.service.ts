import { BadRequestException, Injectable } from '@nestjs/common';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  async signup(email: string, password: string) {
    const users = await this.userService.FindUsers(email);
    if (users.length) {
      throw new BadRequestException(
        'ایمیل قبلا استفاده شده است لطفا ایمیل دیگری انتخاب کنید',
      );
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    return await this.userService.CreateUser(email, result);
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.FindUsers(email);
    if (!user) {
      throw new BadRequestException('این ایمیل وجود ندارد');
    }
    const [salt, hashed] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (hashed !== hash.toString('hex')) {
      throw new BadRequestException('رمز عبور یا ایمیل صحیح نیست ');
    }
    return user;
  }
}
