import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RecipeDto } from './dto/create-recipe.dto';

import { Recipe } from './entities/recipe.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeIngredient } from 'src/recipe-ingredient/entities/recipe-ingredient.entity';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { ClientProxy } from '@nestjs/microservices';

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
    private readonly ingredientRepository: Repository<Ingredient>,
    //producer
    @Inject('RABBITMQ_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async createRecipe(
    userId: number,
    recipeDto: RecipeDto,
  ): Promise<Recipe> {
    const { title, description, ingredients } = recipeDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingRecipe = await this.recipeRepository
      .createQueryBuilder('recipe')
      .where('recipe.user = :userId', { userId: user.id })
      .andWhere('(recipe.title=:title OR recipe.description=:description)', {
        title,
        description,
      })
      .getOne();

    if (existingRecipe) {
      throw new ConflictException(
        'Recipe with similar details already exists for this user',
      );
    }

    const recipe = this.recipeRepository.create({
      title,
      description,
      user,
    });

    const savedRecipe = await this.recipeRepository.save(recipe);
    savedRecipe.id;
    //check the ingredients if the ingredient not exist, create one
    for (const ingredientData of ingredients) {
      this.client.emit('new ingredients', {
        ingredient: ingredientData,
        recipeId: savedRecipe.id,
      });

      let ingredient = await this.ingredientRepository.findOne({
        where: {
          id: ingredientData.id,
          name: ingredientData.name,
        },
      });

      if (!ingredient) {
        ingredient = await this.ingredientRepository.save(this.ingredientRepository.create({
          name: ingredientData.name,
        }))
      }
     
      const recipeIngredient = this.recipeIngredientRepository.create({
        recipeId: savedRecipe.id,
        ingredientId: ingredient.id,
        amount: ingredientData.amount,
        unit: ingredientData.unit,
      });

      await this.recipeIngredientRepository.save(recipeIngredient);
    }

    return await this.recipeRepository.findOne({
      where: { id: savedRecipe.id },
    });
  }

  async findAll() {
    // return this.recipeRepository.find();
    return await this.recipeRepository.find({ relations: ['user'] });
  }

  findOne(recipeId: number) {
    return this.recipeRepository.findOne({ where: { id: recipeId } });
  }

  async findRecipeById(recipeId: number): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({
      where: { id: recipeId },
      relations: ['user'],
    });
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    return recipe;
  }

  async updateRecipe(
    userId: number,
    recipeId: number,
    createRecipeDto: RecipeDto,
  ): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({
      where: {userId, id: recipeId },
    });
    if (!recipe) {
      throw new ForbiddenException(`You are not allowed to update this recipe`);
    }

    Object.assign(recipe, createRecipeDto);

    if (createRecipeDto.ingredients && createRecipeDto.ingredients.length > 0) {
      // Clear existing ingredients
      await this.recipeIngredientRepository.delete({ recipeId });

      // Add new ingredients
      for (const ingredientDto of createRecipeDto.ingredients) {
        let ingredient = await this.ingredientRepository.findOne({
          where: { name: ingredientDto.name },
        });
        if (!ingredient) {
         const newIngredient= this.ingredientRepository.create(ingredientDto);
         ingredient = await this.ingredientRepository.save(newIngredient);
        }
        const recipeIngredient = this.recipeIngredientRepository.create({
          ingredientId: ingredient.id,
          ...ingredientDto,
          recipeId: recipe.id,
        });


        await this.recipeIngredientRepository.save(recipeIngredient);
      }
    }
    return this.recipeRepository.save(recipe);
  }

  async removeRecipe( recipeId:number,userId: number) {
    const recipeIngredient = await this.recipeIngredientRepository.find({
      where: {recipeId},
    });
    const recipe=await this.recipeRepository.findOne({where:{id:recipeId,userId:userId}})
    if (recipeIngredient.length < 0) {
      throw new ForbiddenException(`already deleted`);
    }
   
    if (recipe.userId!==userId) {
      throw new ForbiddenException(`You are not allowed to delete this recipe`);
    }
    this.recipeIngredientRepository.remove(recipeIngredient);
    this.recipeRepository.remove(recipe);
  }
}
