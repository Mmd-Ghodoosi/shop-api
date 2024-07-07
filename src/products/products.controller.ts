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
import { CurrentUser } from 'src/users/deconator/currentUser';
import { Users } from 'src/users/users.entity';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post('createProduct')
  @UseInterceptors(FileInterceptor('picture'))
  // @UseGuards(AuthGuard)
  async createProduct(
    @Body() body: productDto,
    @UploadedFile() picture,
    @CurrentUser() user: Users,
  ) {
    const product = await this.productService.CreateProduct(
      body.name,
      body.price,
      body.colors,
      body.description,
      picture.originalname,
      user,
    );
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
  async findAProduct(@Param('id') id: string, @CurrentUser() user: Users) {
    const product = await this.productService.FindAProduct(id, user);
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

  @Put(':id')
  @UseInterceptors(FileInterceptor('picture'))
  async editProduct(
    @Param('id') id: string,
    @Body() body: ProductEditDto,
    @UploadedFile() picture,
  ) {
    const product = await this.productService.updateProduct(id, {
      name: body.name,
      price: body.price,
      colors:body.colors,
      description:body.description,
      picture: picture.originalname,
    });
    if (!product) {
      throw new NotFoundException('There is no product with this id');
    }
    return 'Product has been updated';
  }
}
