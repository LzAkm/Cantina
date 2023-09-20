import React, { useState, useEffect } from 'react';
import '../Styles/RecipesList.css';
import RecipeCard from '../Component/RecipeCard.jsx';
import { useRecipes } from '../Hooks/useRecipes.jsx';
import { fetchDeleteRecipe } from '../services/api';

function RecipesList() {
  const { recipes, loading, refetchRecipes } = useRecipes();
  const [recipeList, setRecipeList] = useState(recipes);

  useEffect(() => {
    setRecipeList(recipes); 
  }, [recipes]);

  const handleRecipeDelete = async (recipeId) => {
    try {
      await fetchDeleteRecipe(recipeId);
      console.log('Recette supprimée avec succès.');
      refetchRecipes(); 
    } catch (error) {
      console.error('Erreur lors de la suppression de la recette :', error.message);
    }
  };

  return (
    <div className='recipes'>
      <ul className='recipes-list'>
        {loading ? (
          <div>Loading...</div>
        ) : (
          recipeList.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onDelete={handleRecipeDelete} />
          ))
        )}
      </ul>
    </div>
  );
}

export default RecipesList;
