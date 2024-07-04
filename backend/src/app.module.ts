import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {User} from './users/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule ,ConfigService} from '@nestjs/config';
 import { UsersModule } from './users/users.module';
import { RecipeModule } from './recipe/recipe.module';
import { Recipe } from './recipe/entities/recipe.entity';
import { IngredientsModule } from './ingredients/ingredients.module';

import { Ingredient } from './ingredients/entities/ingredient.entity';
import { RecipeIngredient } from './recipe-ingredient/entities/recipe-ingredient.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
  
  ConfigModule.forRoot(),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory:async (configService:ConfigService)=>
    {
      return {
        type:'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database:configService.get<string>('DATABASE_NAME'),
        entities: [Recipe, Ingredient, RecipeIngredient, User],
        logging:true,
        synchronize:false
        
      };
    },
    inject:[ConfigService],
  }
  ),
  UsersModule,
  RecipeModule,
  IngredientsModule,
  AuthModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
