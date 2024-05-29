import { Controller, Get, Param } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';



@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  
  @Get()
  findAll() {
    return this.ingredientsService.findAllIngredients();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ingredientsService.findOneIngredient(id);
  }

}
