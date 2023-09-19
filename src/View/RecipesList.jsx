import React from 'react';
import '../Styles/RecipesList.css';
import RecipeCard from '../Component/RecipeCard.jsx';
import { useRecipes } from '../Hooks/useRecipes.jsx';

function RecipesList() {
  const { recipes, loading } = useRecipes();

  return (
    <div className='recipes'>
      <ul className='recipes-list'>
        {loading ? (
          <div>Loading...</div>
        ) : (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        )}
      </ul>
    </div>
  );
}

export default RecipesList;