import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from './user.model';
@Module({
  
  imports:[TypeOrmModule.forFeature([User])], //define the repositories that are related to this module
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
