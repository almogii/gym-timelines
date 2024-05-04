import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import * as fs from 'fs'
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



    createUser(user:User){
        const existId=this.users.find(u=>u.id==user.id || u.email==user.email)
        console.log(existId);
        
        if(!existId){
            const maxId = this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) : 0;
            const newUser = {
                id: maxId + 1,
                ...user
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

    update(userId: number, updatedUser: User): User | {msg:string} {
        const index = this.users.findIndex(user => user.id == userId);
        if (index !== -1) {
            this.users[index] = { ...this.users[index], ...updatedUser };
            this.saveUsersToFile();
            return this.users[index];
        }
        return {msg:"user not found"}; // Return undefined if user with specified userId is not found
    }
  
}
