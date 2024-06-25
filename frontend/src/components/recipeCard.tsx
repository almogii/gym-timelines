import React from 'react';

import { Avatar,Card,CardProps } from 'antd';


interface RecipeCardProps extends CardProps{
 
  userEmail?: string ;
  userAvatar?: string;
  recipeImage?:string;
  recipeTitle: string;
  description: string;
  
  
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipeImage,userEmail, userAvatar, recipeTitle, description ,...props}) => {
  return (
   
   <Card  style={{width:'300px'}} cover={<img alt={recipeImage} src={recipeImage}></img>} >
   <Card.Meta  title={recipeTitle} avatar={ <Avatar src={userAvatar} shape='circle' size='small'/>} description={description} {...props}></Card.Meta>
   </Card>
  );
};

export default RecipeCard;