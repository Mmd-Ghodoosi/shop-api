import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { model, Model } from 'mongoose';
import { Cart } from './cart.entity';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private readonly res: Model<Cart>) {}
  async addToCart(
    name: string,
    price: number,
    colors: number,
    description: string,
    picture: string,
  ) {
    return await this.res.create({ name, price, colors, description, picture });
  }
  async findCartData() {
    return await this.res.find().exec();
  }
  async findACartData(id: string) {
    return await this.res.findById(id).exec();
  }
  async removeDataFromCart(id: string) {
    return await this.res.findByIdAndDelete(id).exec();
  }
}
