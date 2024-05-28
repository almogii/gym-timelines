import { IsNumber, IsString } from "class-validator";

export class IngredientDto {

    @IsNumber()
    ingredientId?: number;
  
    @IsString()
    name:string;
    @IsNumber()
    amount: number;
  
    @IsString()
    unit: string;

}
