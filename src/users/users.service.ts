import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private readonly res: Model<Users>) {}

  async CreateUser(email: string, password: string) {
    return await this.res.create({ email, password });
  }

  async FindAUser(id: string) {
    return await this.res.findById(parseInt(id)).exec();
  }

  async deleteUser(id: string) {
    return await this.res.findByIdAndDelete(parseInt(id)).exec();
  }
  async EditUser(id: string, User: Partial<Users>) {
    return await this.res.findByIdAndUpdate(id, User, { new: true }).exec();
  }
}
