
import { RecipeIngredient } from "src/recipe-ingredient/entities/recipe-ingredient.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"ingredients"})
export class Ingredient {

    constructor(data: Ingredient) {
        Object.assign(this, data);
      }
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @OneToMany(() => RecipeIngredient, recipeIngredient => recipeIngredient.ingredient)
    recipeIngredients: RecipeIngredient[];


}
