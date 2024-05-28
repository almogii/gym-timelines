import { Injectable } from '@nestjs/common';
import {IngredientDto } from './dto/ingredient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { Repository } from 'typeorm';

@Injectable()


export class IngredientsService {
 
constructor(@InjectRepository(Ingredient)
private readonly ingredientRepository: Repository<Ingredient>)
{}

 async create(createIngredientDto: IngredientDto) {

  return `This action returns all ingredients`;

  }
  findAll() {
    return `This action returns all ingredients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredient`;
  }

  update(id: number, updateIngredientDto: IngredientDto) {
    return `This action removes a #${id} ingredient`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingredient`;
  }
}
