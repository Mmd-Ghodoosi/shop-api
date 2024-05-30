import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Users } from 'src/users/users.entity';
@Schema()
export class Products {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  picture: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Users' }] })
  user: Users;
}
export const ProductSchema = SchemaFactory.createForClass(Products);
