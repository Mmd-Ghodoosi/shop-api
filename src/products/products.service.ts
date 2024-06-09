import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from './products.entity';
import { Model } from 'mongoose';
import { Users } from 'src/users/users.entity';
import { ProductEditDto } from './dto/productEdit-dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private readonly res: Model<Products>,
  ) {}

  async CreateProduct(
    name: string,
    price: number,
    code: string,
    colors: number,
    description: string,
    picture: string,
    user: Users,
  ) {
    const Product = await this.res.create({
      name,
      price,
      code,
      colors,
      description,
      picture,
    });
    await (Product.user = user);

    return Product;
  }

  async FindProducts() {
    return await this.res.find().exec();
  }
  async FindAProduct(id: string) {
    return await this.res.findById(id).exec();
  }
  async DeleteProduct(id: string) {
    return await this.res.findByIdAndDelete(id).exec();
  }
  async updateProduct(id: string, attrs: Partial<Products>) {
    return this.res.findByIdAndUpdate(id, attrs, { new: true }).exec();
  }
}
