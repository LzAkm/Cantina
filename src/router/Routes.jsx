import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RecipesList from '../View/RecipesList.jsx';
import RecipeDetail from '../View/RecipeDetail.jsx';
import AddRecipeForm from '../Component/AddRecipeForm.jsx';
import EditRecipe from '../Component/EditRecipe.jsx';

function AppRouter() {
  return (
    <Routes>
      <Route path="/recipes/:id" Component={RecipeDetail} />
      <Route path="/" Component={RecipesList} />
      <Route path="/addRecipe" Component={AddRecipeForm} />
      <Route path="/editRecipe" Component={EditRecipe} />
    </Routes>
  );
}

export default AppRouter;
