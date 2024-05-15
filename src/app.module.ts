import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import {User} from './users/user.model'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule ,ConfigService} from '@nestjs/config';
 import { UsersModule } from './users/users.module';

@Module({
  imports: [
   
  ConfigModule.forRoot(),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory:async (configService:ConfigService)=>
    {
      return {
        type:'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database:configService.get<string>('DATABASE_NAME'),
        entities: [User],
        logging:true,
        synchronize:false
        
      };
    },
    inject:[ConfigService],
  }
  ),
  UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
