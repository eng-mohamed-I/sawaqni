import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/core/schemas/user.schema';
import { AuthModule } from '../auth/auth.module';
import { ApiFeaturesService } from 'src/core/services/api-feature.service';
//=====================================================
@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService,ApiFeaturesService],
})
export class UserModule {}
