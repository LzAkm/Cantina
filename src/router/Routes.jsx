import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RecipesList from '../View/RecipesList.jsx';
import RecipeDetail from '../View/RecipeDetail.jsx';
import EditRecipe from '../View/EditRecipe.jsx';
import NotFound from '../View/NotFound.jsx';
import AddRecipeForm from '../View/AddRecipe.jsx';

function AppRouter() {
  return (
    <Routes>
      <Route path="/recipes/:id" Component={RecipeDetail} />
      <Route path="/" Component={RecipesList} />
      <Route path="/addRecipe" Component={AddRecipeForm} />
      <Route path="/editRecipe/:id" Component={EditRecipe} />
      <Route path='*' element={<NotFound/>} />
    </Routes>
  );
}

export default AppRouter;
