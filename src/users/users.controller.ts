import { Controller, Get, Post ,Param, Body, Delete} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor( private readonly usersService:UsersService){}

@Get() /* --> /users*/ 
findAllUsers(){
   return this.usersService.findAllUsers()
}

@Get(':userId')  /* /users/:userId (:userId represent params) */

findOneByID(@Param('userId') userId:string){
  
    return this.usersService.findOneByID(userId)
}

@Post() 
createUser(@Body() user:any){
    return this.usersService.createUser(user)
}

@Delete(':userId')
deleteUser(@Param('userId') userId:string){
    
    return this.deleteUser(userId)
}

}

