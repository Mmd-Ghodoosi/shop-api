import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto } from './dto/cart-dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post('addToCart')
  @UseInterceptors(FileInterceptor('picture'))
  async addToCart(@Body() body: CartDto, @UploadedFile() picture) {
    console.log(body);

    const addedToCart = await this.cartService.addToCart(
      body.name,
      body.price,
      body.colors,
      body.description,
      body.picture,
      body.email,
    );
    console.log(addedToCart);
    if (addedToCart) return 'added to cart';
  }

  @Get('findCartData')
  async findCartData(@Query('email') email: string) {
    const cartData = await this.cartService.findCartData(email);
    if (!cartData) {
      throw new NotFoundException('There is no data with in this cart');
    }
    return cartData;
  }

  @Get('findACartData/:id')
  async findACartData(@Param('id') id: string) {
    const cartData = await this.cartService.findACartData(id);
    if (!cartData) {
      throw new NotFoundException('There is no cart data with this id');
    }
    return cartData;
  }

  @Delete('removeDataFromCart/:id')
  async removeDataFromCart(@Param('id') id: string) {
    const cartData = await this.cartService.removeDataFromCart(id);
    if (!cartData) {
      throw new NotFoundException('There is no cart data with this id');
    }
    return 'Cart data has been removed from your cart';
  }
}
