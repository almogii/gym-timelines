import { IsString, IsArray } from 'class-validator';


import { IngredientDto } from 'src/ingredients/dto/ingredient.dto';


export class CreateRecipeDto {
    @IsString()
    title: string;
  
    @IsString()
    description: string;
  
    @IsArray()
    ingredients: IngredientDto[];
}

