import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { ProductModule } from './modules/product/product.module';
import { TokenModule } from './modules/token/token.module';
//===============================================================
@Module({
  imports: [
    // for .env config
    ConfigModule.forRoot({ isGlobal: true }),
    // get uri of Mongo
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    // Modules
    AuthModule,
    UserModule,
    ProductModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
//===============================================================
export class AppModule {}
