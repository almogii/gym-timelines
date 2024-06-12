import { IsNumber, IsOptional, IsString } from "class-validator";

export class IngredientDto {

    @IsNumber()
    @IsOptional()
    id: number;
    @IsString()
    name:string;
    @IsNumber()
    amount: number;
    @IsString()
    unit: string;

}
