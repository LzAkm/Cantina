import axios from 'axios';

// Requete pour avoir une recette
export async function fetchRecipeData(recipeId) {
  const API_RECIPE_URL = `http://localhost:9000/api/recipe/${recipeId}`;
  try {
    const response = await axios.get(`${API_RECIPE_URL}`); 
    return response.data;
  } catch (error) {
    throw error;
  }
};

const API_BASE_URL = 'http://localhost:9000/api';

// Requete pour avoir toutes les recettes
export async function fetchAllRecipes() {
  try {
    const response = await axios.get(`${API_BASE_URL}/recipes`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Requete pour ajouter une recette
export async function fetchAddRecipe(recipe) {
  try {
    const response = await axios.post(`${API_BASE_URL}/recipes`, recipe);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Requete pour modifier une recette
export async function fetchEditRecipe(recipeId) {
  try {
    const response = await axios.put(`${API_BASE_URL}/recipe/${recipeId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Requete pour supprimer une recette
export async function fetchDeleteRecipe(recipeId) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/recipe/${recipeId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};