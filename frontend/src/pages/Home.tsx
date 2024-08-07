import React, { useEffect, useState } from 'react';


import RecipeCard from '../components/recipeCard'
import {getAllRecipes,postAllPics} from '../api/recipe'
import { getAllUsers } from '../api/auth';
import {Recipe} from '../../../backend/src/recipe/entities/recipe.entity'
import {User} from '../../../backend/src/users/entities/user.entity'
import { Col , Row, Space } from 'antd';
import { NavBarComponent } from '../components/navbar';

const HomePage: React.FC = () => {
  const imgLink:string='https://www.themealdb.com/images/ingredients/Lime.png'
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [users,setUsers]=useState<User[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([]);
 

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all recipes and users
        const allRecipesResponse = await getAllRecipes();
        const allUsersResponse = await getAllUsers();
        setRecipes(allRecipesResponse.data);
        setUsers(allUsersResponse.data);

        // Generate images for each recipe
        const allPicsResponse = await postAllPics(allRecipesResponse.data);
        setImageUrls(allPicsResponse.data); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);



  return (
    <div>
      {/* Navbar */}
     <Space direction='vertical' size="middle" style={{ display: 'flex' }}>
      <NavBarComponent />
      
      {/* Recipe Cards */}
      
      <Row style={{justifyContent:'center'}} justify='space-between' gutter={[12,12]} >
      {recipes.map((recipe,index)=>{
          const user= users.find(user=>user.id === recipe.userId) 
          const recipeImage = imageUrls[index] || imgLink;
          
          return(<Col xs={24} sm={12} md={6} ><RecipeCard recipeImage={recipeImage} userEmail={user?user.email:'no email'} recipeTitle={recipe.title} description={recipe.description}          
          /></Col>)
        })}     
      </Row>
      </Space>
    </div>
  );
};

export default HomePage;