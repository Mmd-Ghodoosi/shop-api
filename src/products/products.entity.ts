import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Products {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  colors: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  picture: string;
}
export const ProductSchema = SchemaFactory.createForClass(Products);
