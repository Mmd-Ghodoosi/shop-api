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
    code: string,
    picture: string,
  ) {
    const Product = await this.res.create({ name, price, code, picture });
    return Product;
  }

  async FindProducts(name: string) {
    return await this.res.find({ name }).exec();
  }
  async FindAProduct(id: string) {
    return await this.res.findById(parseInt(id)).exec();
  }
  async DeleteProduct(id: string) {
    return await this.res.findByIdAndDelete(parseInt(id)).exec();
  }
  async EditProduct(id: string, Product: Partial<Products>) {
    return await this.res.findByIdAndUpdate(id, Product, { new: true }).exec();
  }
}
