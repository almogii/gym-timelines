import { Controller, Get, Post, Body, Patch, Param, Delete, Injectable, ParseIntPipe } from '@nestjs/common';
// import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';


import { RecipeService } from './recipe.service';

@Injectable()
@Controller('recipe')
export class RecipeController {
  
    constructor(private readonly recipeService: RecipeService) {}

  @Post(':userId')
  create(@Param('userId',ParseIntPipe) userId:number, @Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.createRecipe(userId,createRecipeDto);
  }

  @Get()
  findAll() {
    return this.recipeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.recipeService.findOne(id);
  }

  @Patch(':userId/:recipeId')
  update(
      @Param('userId') userId: number,
      @Param('recipeId') recipeId: number,
      @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
      return this.recipeService.updateRecipe(userId, recipeId, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recipeService.remove(id);
  }
}
