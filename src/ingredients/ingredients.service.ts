import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { Repository } from 'typeorm';
import { IngredientDto } from './dto/ingredient.dto';
import { RecipeIngredient } from 'src/recipe-ingredient/entities/recipe-ingredient.entity';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';


@Injectable()
export class IngredientsService {
  private readonly logger = new Logger(IngredientsService.name);
constructor(
@InjectRepository(Ingredient)
private readonly ingredientRepository: Repository<Ingredient>,
@InjectRepository(RecipeIngredient)
private readonly recipeIngredientRepository: Repository<RecipeIngredient>,

)
{}

async findAllIngredients() {
    return await this.ingredientRepository.find();
  }

  async findById(id:number){
   return await this.ingredientRepository.findOne({where:{id:id}})
  }
  async findOneIngredient(id: number) {
    return await this.findById(id) ;
  }
 
  async createIngredient(ingredientDto: IngredientDto) {
    const ingredient = this.ingredientRepository.create(ingredientDto);
    return await this.ingredientRepository.save(ingredient);
  }

  @EventPattern('new ingredients')
  async handleNewIngredient(@Payload() payload: { recipeId: number, ingredient: IngredientDto }, @Ctx() context: RmqContext) {
    this.logger.log(`Received new ingredient event: ${JSON.stringify(payload)}`);
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    const { recipeId, ingredient } = payload;

    let existIngredient = await this.findOneIngredient(ingredient.id);
    if (!existIngredient) {
      this.logger.log(`Ingredient not found, creating new ingredient: ${JSON.stringify(ingredient)}`);
      existIngredient = await this.createIngredient(ingredient);
    }

    const existingRecipeIngredient = await this.recipeIngredientRepository.findOne({
      where: {
        recipeId,
        ingredientId: existIngredient.id,
      },
    });

    if (!existingRecipeIngredient) {
      this.logger.log(`RecipeIngredient not found, creating new RecipeIngredient for recipeId: ${recipeId}, ingredientId: ${existIngredient.id}`);
      const recipeIngredient = this.recipeIngredientRepository.create({
        recipeId,
        ingredientId: existIngredient.id,
        amount: ingredient.amount,
        unit: ingredient.unit,
      });
      await this.recipeIngredientRepository.save(recipeIngredient);
      this.logger.log(`Created new RecipeIngredient for recipeId: ${recipeId}, ingredientId: ${existIngredient.id}`);
    }

    channel.ack(originalMessage);
  }
  
}



