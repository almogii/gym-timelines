import {  ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity'; 
import { User } from 'src/users/entities/user.entity';
import {  Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeIngredient } from 'src/recipe-ingredient/entities/recipe-ingredient.entity';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';

@Injectable()


export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RecipeIngredient)
    private readonly recipeIngredientRepository: Repository<RecipeIngredient>,
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>
  ){}

  async createRecipe(userId: number, createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const { title, description, ingredients } = createRecipeDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    const existRecipe= await this.recipeRepository.find({where:{title,description,userId}})
    if(existRecipe){
      throw new Error('Recipe with similar details already exists for this user');

      
    
    
    }
    const recipe = this.recipeRepository.create({
      title,
      description,
      user,
    });

    const savedRecipe = await this.recipeRepository.save(recipe);

    for (const ingredientData of ingredients) {
      let ingredient = await this.ingredientRepository.findOne({ where: { id: ingredientData.ingredientId } });

      if (!ingredient) {
        // If the ingredient doesn't exist, create a new one
        ingredient = this.ingredientRepository.create({
         
         id:ingredientData.ingredientId,
         name:ingredientData.name
        });
        ingredient = await this.ingredientRepository.save(ingredient);
      }

      const recipeIngredient = this.recipeIngredientRepository.create({
        recipe: savedRecipe,
        ingredient,
        amount: ingredientData.amount,
        unit: ingredientData.unit,
      });

      await this.recipeIngredientRepository.save(recipeIngredient);
    }

    return this.recipeRepository.findOne({where:{id:savedRecipe.id}});
  }

  findAll() {
    return this.recipeRepository.find();
  }

  findOne(recipeId: number) {
    return this.recipeRepository.findOne({where:{id:recipeId}});
  }

  

  async findRecipeById(recipeId: number): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({ where: { id: recipeId }, relations: ['user'] });
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    return recipe;
  }

  async updateRecipe(userId: number, recipeId: number, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    const recipe = await this.findRecipeById(recipeId);
    if (recipe.user.id !== userId) {
        throw new ForbiddenException(`You are not allowed to update this recipe`);
    }

    Object.assign(recipe, updateRecipeDto);

    if (updateRecipeDto.ingredients && updateRecipeDto.ingredients.length > 0) {
        // Clear existing ingredients
        await this.recipeIngredientRepository.delete({ recipeId });

        // Add new ingredients
        for (const ingredientDto of updateRecipeDto.ingredients) {
            const recipeIngredient = this.recipeIngredientRepository.create({
                ...ingredientDto,
                recipeId: recipe.id
            });
            await this.recipeIngredientRepository.save(recipeIngredient);
        }
    }

    return this.recipeRepository.save(recipe);
}

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
