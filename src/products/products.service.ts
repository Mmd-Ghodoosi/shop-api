import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from './products.entity';
import { Model } from 'mongoose';
import { Users } from 'src/users/users.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private readonly res: Model<Products>,
  ) {}

  async CreateProduct(
    name: string,
    price: number,
    code: string,
    picture: string,
    user: Users,
  ) {
    const Product = await this.res.create({ name, price, code, picture });
    await (Product.user = user);

    return Product;
  }

  async FindProducts() {
    return await this.res.find().exec();
  }
  async FindAProduct(id: string, user: Users) {
    const Product = await this.res.findById(id).exec();
    await (Product.user = user);
    return Product;
  }
  async DeleteProduct(id: string) {
    return await this.res.findByIdAndDelete(id).exec();
  }
  async EditProduct(id: string, Product: Partial<Products>) {
    return await this.res.findByIdAndUpdate(id, Product, { new: true }).exec();
  }
}
