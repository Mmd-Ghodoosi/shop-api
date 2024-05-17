import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
const cookie = require('cookie-session');

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/shop-api'),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) },
  ],
})
export class AppModule {
  constructor(private config: ConfigService) {}
  configure(consume: MiddlewareConsumer) {
    consume.apply(cookie({ keys: [this.config.get('COOKIE')] })).forRoutes('*');
  }
}
