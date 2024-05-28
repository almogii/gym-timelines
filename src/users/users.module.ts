import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
  
  imports:[TypeOrmModule.forFeature([User])], //define the repositories that are related to this module
  providers: [UsersService],
  controllers: [UsersController],
  exports: [TypeOrmModule]
})
export class UsersModule {}
