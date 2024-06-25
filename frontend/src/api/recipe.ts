import { apiService } from ".";
import axios from "axios";
import { Recipe } from "../../../backend/src/recipe/entities/recipe.entity";

export const getAllRecipes = async () =>{

    return await apiService.get('/recipe')

}
export const postAllPics = async (recipes: Recipe[]) => {
    try {
      const imgPromise = recipes.map(async (recipe) => {
        const response = await axios.post('https://api.openai.com/v1/images/generations', {
          prompt: recipe.title,
          n: 1,
          size: "1024x1024"
        }, {
          headers: {
            'Authorization': ` Bearer sk-proj-UVqnIhDvMUrXdDBE63qnT3BlbkFJfzfqZo250UWO3phDwZpl`,  
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data ,"this is data ");
        
        return response.data.data[0].url;
      });
  
      const imageUrls = await Promise.all(imgPromise);
      return { data: imageUrls};
    } catch (error) {
      console.error("Error generating images: ", error);
      throw new Error("Failed to generate images");
    }
  };


