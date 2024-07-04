import { Injectable,UnauthorizedException  } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
 constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
 ){}

 async logIn(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({where:{email:email}})
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const {email,password} = createUserDto
    const existUser= await this.userRepository.findOne({where:{email:email,password:password}})
    if(existUser){
      throw new UnauthorizedException();
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const newUser= this.userRepository.create({...createUserDto,password:hashedPassword})
    
    return await this.userRepository.save(newUser)

  }


  }


