import { apiService } from ".";
import axios from "axios";
import { Recipe } from "../../../backend/src/recipe/entities/recipe.entity";

interface UnsplashResponse {
  results: { urls: { regular: string } }[];
}

export const getAllRecipes = async () =>{

    return await apiService.get('/recipe')

}



export const postAllPics = async (recipes: Recipe[]): Promise<{ data: string[] }> => {
  try {
    const imgPromise = recipes.map(async (recipe) => {
      const response = await axios.get<UnsplashResponse>('https://api.unsplash.com/search/photos', {
        params: {
          query: recipe.title,
          per_page: 1
        },
        headers: {
          'Authorization': `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`, // Use environment variable
        }
      });
      return response.data.results[0]?.urls.regular;
    });

    const imageUrls = await Promise.all(imgPromise);
    return { data: imageUrls };
  } catch (error) {
    console.error('Error fetching images: ',error);
    throw new Error('Failed to fetch images');
  }
};

