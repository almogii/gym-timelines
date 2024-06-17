import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { RecipeIngredient } from 'src/recipe-ingredient/entities/recipe-ingredient.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';





@Module({
  imports:[TypeOrmModule.forFeature([Ingredient,RecipeIngredient]),
  ClientsModule.register([{
    name:'RABBITMQ_SERVICE',
    transport: Transport.RMQ,
    options:{
      urls:['amqp://localhost:5672'],
      queue:'main_queue',
      queueOptions:{
        durable:false
      }
    }
  }])
],
  controllers: [IngredientsController],
  providers: [IngredientsService],
})
export class IngredientsModule {}
