import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from './products.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private readonly res: Model<Products>,
  ) {}

  async CreateProduct(
    name: string,
    price: number,
    colors: number,
    description: string,
    picture: string,
  ) {
    const Product = await this.res.create({
      name,
      price,
      colors,
      description,
      picture,
    });

    return Product;
  }

  async FindProducts() {
    return await this.res.find().exec();
  }
  async FindAProduct(id: string) {
    const User = await this.res.findById(id).exec();
    return User;
  }
  async DeleteProduct(id: string) {
    return await this.res.findByIdAndDelete(id).exec();
  }
  async updateProduct(id: string, attrs: Partial<Products>) {
    return this.res.findByIdAndUpdate(id, attrs, { new: true }).exec();
  }
}
