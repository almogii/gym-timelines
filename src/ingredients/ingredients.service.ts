import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { Repository } from 'typeorm';


@Injectable()


export class IngredientsService {
 
constructor(@InjectRepository(Ingredient)
private readonly ingredientRepository: Repository<Ingredient>)
{}

async findAllIngredients() {
    return  await this.ingredientRepository.find();
  }

  async findOneIngredient(id: number) {
    return await this.ingredientRepository.find({where:{id:id}}) ;
  }

  
}
