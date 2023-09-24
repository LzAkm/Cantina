import { createSlice } from '@reduxjs/toolkit';

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    recipeToEdit: null,
  },
  reducers: {
    addRecipe: (state, action) => {
      state.recipes.push(action.payload);
    },

    deleteRecipe: (state, action) => {
      state.recipes = state.recipes.filter((recipe) => recipe.id !== action.payload);
    },

    setRecipeToEdit: (state, action) => {
      state.recipeToEdit = action.payload;
    },

    updateRecipe: (state, action) => {
      const { id, updatedRecipe } = action.payload;
      const index = state.recipes.findIndex((recipe) => recipe.id === id);
      if (index !== -1) {
        state.recipes[index] = updatedRecipe;
      }
    },
  },
});

export const {
  addRecipe,
  deleteRecipe,
  setRecipeToEdit,
  updateRecipe,
} = recipeSlice.actions;

export default recipeSlice.reducer;
