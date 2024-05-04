import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import {CreateUserDto} from './dto/create-user.dto';
import * as fs from 'fs'
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {

    private users:User[] 
    
    constructor() {
    
        
        try {
            const jsonString = fs.readFileSync('src/users/users.json', 'utf-8');
            console.log(jsonString);
            
            // Parse the JSON string
            this.users = JSON.parse(jsonString).map((userData: any) => new User(userData));
        } catch (err) {
            console.error("Error reading users file:", err);
            this.users = [];
        }
    }


    private saveUsersToFile() {
        
        try {
            fs.writeFileSync('src/users/users.json', JSON.stringify(this.users, null, 2));
            console.log("Users data saved successfully.");
        } catch (err) {
            console.error("Error writing users file:", err);
        }
    }

      findAllUsers(){    
       return this.users
      };

      findOneByID(userId:number) {
        const user= this.users.filter(user=> user.id == userId);
        if(user.length===0){
            return {"msg":"user not exist"}
        }
        return user
      }

    createUser(createUserDto:CreateUserDto){
        const existId=this.users.find(u=>u.firstName==createUserDto.firstName || u.email==createUserDto.email)
        
        if(!existId){
            const maxId = this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) : 0;
            const newUser = {
                id: maxId + 1,
                ...createUserDto
            };
        this.users.push(newUser)
        this.saveUsersToFile();
        return newUser;
        }
        else{return {'msg':'this user is already exist' ,'user':[existId]}}
        
     
    }
    deleteUser(userId: number): User | undefined {
        const index = this.users.findIndex(user => user.id == userId);
        if (index !== -1) {
            const removedUser = this.users.splice(index, 1)[0];
            this.saveUsersToFile();
            return removedUser;
        }
        return undefined; // Return undefined if user with specified userId is not found
    }

    update( id:number,updatedUser: UpdateUserDto): User | undefined {
        const index=this.users.findIndex(user=>user.id==id);
        if(index===-1){
            return undefined
        }
        else{

            this.users[index] = { ...this.users[index], ...updatedUser };
            this.saveUsersToFile()
            return this.users[index]
        }

            
            
       
    }
  
}
