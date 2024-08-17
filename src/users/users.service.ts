import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './users.entity';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private readonly res: Model<Users>) {}

  async CreateUser(email: string, password: string) {
    return await this.res.create({ email, password });
  }

  async FindAUser(id: string) {
    return await this.res.findById(id).exec();
  }
  async FindUsers(email: string) {
    return await this.res.find({ email }).exec();
  }

  async deleteUser(id: string) {
    return await this.res.findByIdAndDelete(id).exec();
  }
  async EditUser(id: string, User: Partial<Users>) {
    const user = await this.res.findById(id).exec();
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(User.password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    user.password = result;
    return await this.res.findByIdAndUpdate(id, user, { new: true }).exec();
  }
}
