import { Controller, Get, Post ,Param, Body, Delete, Patch} from '@nestjs/common';
import { UsersService } from './users.service';
import { ParseIntPipe } from '@nestjs/common';
import { User } from './user.model';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';

@Controller('users') 
export class UsersController {

 constructor( private readonly usersService:UsersService){}

 

@Get() /* --> /users*/ 
findAllUsers(){
   return this.usersService.findAllUsers()
}

@Get(':userId')  /* /users/:userId (:userId represent params) */

findOneByID(@Param('userId',ParseIntPipe) userId:number){
  
    return this.usersService.findOneByID(userId)
}

@Post() 
createUser(@Body() createUserDto:CreateUserDto){
    return this.usersService.createUser(createUserDto)
}

@Delete(':userId')
deleteUser(@Param('userId') userId: number): User | undefined {
    return this.usersService.deleteUser(userId);
}

@Patch(':id')
update(@Param('id',ParseIntPipe) id:number, @Body() updatedUserDto: UpdateUserDto) {
    return this.usersService.update(id,updatedUserDto)
}


}

