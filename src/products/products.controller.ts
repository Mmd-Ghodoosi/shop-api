import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { productDto } from './dto/product-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductEditDto } from './dto/productEdit-dto';
import { AuthGuard } from 'Guard/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post('createProduct')
  @UseInterceptors(FileInterceptor('picture'))
  @UseGuards(AuthGuard)
  async createProduct(@Body() body: productDto, @UploadedFile() picture) {
    console.log(picture);

    const product = await this.productService.CreateProduct(
      body.name,
      body.price,
      body.code,
      picture.originalname,
    );
    console.log(product);
    if (product) return 'Product has been created';
  }

  @Get('findProducts')
  async findProducts() {
    const product = await this.productService.FindProducts();
    if (!product) {
      throw new NotFoundException('There is no product with this name');
    }
    return product;
  }

  @Get('findAProduct/:id')
  async findAProduct(@Param('id') id: string) {
    const product = await this.productService.FindAProduct(id);
    if (!product) {
      throw new NotFoundException('There is no product with this id');
    }
    return product;
  }

  @Delete('deleteProduct/:id')
  async deleteProduct(@Param('id') id: string) {
    const product = await this.productService.DeleteProduct(id);
    if (!product) {
      throw new NotFoundException('There is no product with this id');
    }
    return 'Product has been deleted';
  }

  @Put('editProduct/:id')
  async editProduct(@Param('id') id: string, @Body() body: ProductEditDto) {
    const product = await this.productService.EditProduct(id, body);
    if (!product) {
      throw new NotFoundException('There is no product with this id');
    }
    return 'Product has been updated';
  }
}
