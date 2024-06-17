import { Controller, Get, Post, Body, Patch, Param, Delete, Injectable, ParseIntPipe } from '@nestjs/common';
import { RecipeDto } from './dto/create-recipe.dto';
import { RecipeService } from './recipe.service';


@Injectable()
@Controller('recipe')
export class RecipeController {
  
    constructor(private readonly recipeService: RecipeService) {}

  @Post(':userId')
  create(@Param('userId',ParseIntPipe) userId:number, @Body() recipeDto: RecipeDto) {
    return this.recipeService.createRecipe(userId,recipeDto);
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
  updateRecipe(
    @Param('userId') userId: number,
      @Param('recipeId') recipeId: number,
      @Body() createRecipeDto: RecipeDto,
  ) {
      return this.recipeService.updateRecipe(userId, recipeId, createRecipeDto);
  }

  @Delete(':userId/:recipeId')
  removeRecipe(@Param('userId') userId: number,@Param('recipeId') recipeId: number) {
    return this.recipeService.removeRecipe(recipeId,+userId);
  }
}
