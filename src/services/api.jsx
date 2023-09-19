import axios from 'axios';

// Fetch d'une recette
export const fetchRecipeData = async (recipeId) => {
  const API_RECIPE_URL = `http://localhost:9000/api/recipe/${recipeId}`;
  try {
    const response = await axios.get(`${API_RECIPE_URL}`); 
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch de toutes les recettes
const API_BASE_URL = 'http://localhost:9000/api';
export const fetchAllRecipes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/recipes`);
    return response.data;
  } catch (error) {
    throw error;
  }
};