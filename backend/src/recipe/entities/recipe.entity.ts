import { RecipeIngredient } from "src/recipe-ingredient/entities/recipe-ingredient.entity";
import { User } from "src/users/entities/user.entity";
import { PrimaryGeneratedColumn,Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity({name:"recipes"})
export class Recipe {
  constructor(data: Recipe) {
    Object.assign(this, data);
  }
@PrimaryGeneratedColumn()
id:number

@Column()
title:string; 

@Column()
description:string
@Column()
userId: number;
@ManyToOne(() => User, user => user.recipes)
user: User;

@OneToMany(() => RecipeIngredient, recipeIngredient => recipeIngredient.recipe)
recipeIngredients: RecipeIngredient[]

}
