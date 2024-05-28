import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';
import { RecipeIngredient } from 'src/recipe-ingredient/entities/recipe-ingredient.entity';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Recipe,User,RecipeIngredient,Ingredient]),UsersModule],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
