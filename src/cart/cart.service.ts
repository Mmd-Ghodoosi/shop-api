import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
    email: string,
  ) {
    const addedToCart = await this.res.create({
      name,
      price,
      colors,
      description,
      picture,
      email,
    });
    return addedToCart;
  }
  async findCartData(email: string) {
    const User = await this.res.find({ email }).exec();
    return User;
  }
  async findACartData(id: string) {
    const User = await this.res.findById(id).exec();
    return User;
  }
  async removeDataFromCart(id: string) {
    return await this.res.findByIdAndDelete(id).exec();
  }
}
