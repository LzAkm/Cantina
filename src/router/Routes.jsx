import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RecipesList from '../View/RecipesList.jsx';
import RecipeDetail from '../View/RecipeDetail.jsx';
import AddRecipe from '../View/AddRecipe.jsx';

function AppRouter() {
  return (
    <Routes>
      <Route path="/recipes/:id" Component={RecipeDetail} />
      <Route path="/" Component={RecipesList} />
      <Route path="/addRecipe" Component={AddRecipe} />
    </Routes>
  );
}

export default AppRouter;
