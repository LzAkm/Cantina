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

const API_BASE_URL = 'http://localhost:9000/api';

// Fetch de toutes les recettes
export const fetchAllRecipes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/recipes`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Ajouter une recette
export const fetchAddRecipe = async (recipe) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/recipes`, recipe);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Modifier une recette
export const fetchEditRecipe = async (recipeId) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/recipe/${recipeId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Supprimer une recette
export const fetchDeleteRecipe = async (recipeId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/recipe/${recipeId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};