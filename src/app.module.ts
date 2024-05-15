import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
const cookie = require('cookie-session');

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/shop-api'),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) },
  ],
})
export class AppModule {
  configure(consume: MiddlewareConsumer) {
    consume.apply(cookie({ keys: ['asdf'] })).forRoutes('*');
  }
}
