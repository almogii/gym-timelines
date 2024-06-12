import { Ingredient } from "src/ingredients/entities/ingredient.entity";
import { Recipe } from "src/recipe/entities/recipe.entity";
import { Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";

@Entity()
export class RecipeIngredient {
    @PrimaryColumn()
    recipeId: number;

    @PrimaryColumn()
    ingredientId: number;

    @Column()
    amount: number;

    @Column()
    unit: string;

    @ManyToOne(() => Recipe, recipe => recipe.recipeIngredients)
    recipe: Recipe;

    @ManyToOne(() => Ingredient, ingredient => ingredient.recipeIngredients)
    ingredient: Ingredient;
}