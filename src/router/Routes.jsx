import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RecipesList from '../View/RecipesList.jsx';
import RecipeDetail from '../View/RecipeDetail.jsx';

function AppRouter() {
  return (
    <Routes>
      <Route path="/recipes/:id" Component={RecipeDetail} />
      <Route path="/" Component={RecipesList} />
    </Routes>
  );
}

export default AppRouter;
