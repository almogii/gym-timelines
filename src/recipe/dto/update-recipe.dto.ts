   
import { IsString, IsOptional } from 'class-validator';
import { IngredientDto } from 'src/ingredients/dto/ingredient.dto';
;



export class UpdateRecipeDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    ingredients: IngredientDto[];
}

    

 