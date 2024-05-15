import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import {CreateUserDto} from './dto/create-user.dto';
// import * as fs from 'fs'
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {

        constructor(
            @InjectRepository(User)
            private usersRepository: Repository<User>,
          ) {}
       

     async findAllUsers():Promise<User[]>{ 
         if( !await this.usersRepository.find() || (await this.usersRepository.find()).length===0) throw new NotFoundException('User not found ')

        return await this.usersRepository.find()
       
      };

     async findOneByID(userId:number) {
       
           const user=  await this.usersRepository.findOne({where:{id:userId}})
           if (!user)  throw new NotFoundException('User not found ') 
          return user

      }

      async createUser(createUserDto: CreateUserDto): Promise<User> {
        // Check if a user with the given email already exists
        const existingUser = await this.usersRepository.findOne({where:{ email: createUserDto.email }});
    
        if (existingUser) {
          throw new NotFoundException('User with this email already exists');
        }
    
        // Create a new user entity with the provided data
        const newUser = this.usersRepository.create(createUserDto);
    
        // Save the new user entity to the database
        return this.usersRepository.save(newUser);
      }

      async deleteUser(userId: number) {
        // Find the user with the provided userId in the database
        const user = await this.usersRepository.findOne({where:{id:userId}})
        
        if(user){
        
        await this.usersRepository.remove(user)
        return `User with id ${userId} has been successfully deleted`;
        }
        
        return new Error(`there is no such user`)
         
      }

     async update(id:number,updatedUserDto:UpdateUserDto){
        
        const oldUser= await this.usersRepository.findOne({where:{ id: id }})
        if (!oldUser) {
            throw new NotFoundException(`User with email ${updatedUserDto.email} not found`);
        }
        const updatedUser = Object.assign(oldUser, updatedUserDto);
        return this.usersRepository.save(updatedUser);
     }
  
}
