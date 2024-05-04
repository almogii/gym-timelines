import { Controller, Get, Post ,Param, Body, Delete, Patch} from '@nestjs/common';
import { UsersService } from './users.service';
import { ParseIntPipe } from '@nestjs/common';
import { User } from './user.model';

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
createUser(@Body() user:User){
    return this.usersService.createUser(user)
}

@Delete(':userId')
deleteUser(@Param('userId') userId: number): User | undefined {
    return this.usersService.deleteUser(userId);
}

@Patch()
update(@Body() updatedUser: User) {
    return this.usersService.update(updatedUser)
}


}

