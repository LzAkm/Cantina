import React, { useEffect, useState } from 'react';
import '../Styles/RecipesList.css';
import RecipeCard from '../Component/RecipeCard.jsx';
import { useRecipes } from '../Hooks/useRecipes.jsx';
import { fetchDeleteRecipe, fetchAddRecipe } from '../services/api.js';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function RecipesList() {
  const { recipes, loading } = useRecipes();
  const [recipesList, setRecipesList] = useState(recipes);
  const [selectValue, setSelectValue] = useState('');
  const [minPortion, setMinPortion] = useState('');
  const [maxPortion, setMaxPortion] = useState('');
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    setRecipesList(recipes)
  }, [recipes])

  const handleRecipeDelete = async (recipeId) => {
    try {
      await fetchDeleteRecipe(recipeId);
      setRecipesList(recipesList.filter(r => r.id !== recipeId))
      console.log('Recette supprimée avec succès.');
    } catch (error) {
      console.error('Erreur lors de la suppression de la recette :', error.message);
    }
  };

  const handleRecipeAdd = async (recipeId) => {
    try {
      const addedRecipe = await fetchAddRecipe(recipeId);
      const updatedRecipesList = [...recipesList, addedRecipe];
      setRecipesList(updatedRecipesList);
      console.log('Recette ajoutée avec succès.');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la recette :', error.message);
    }
  }; 


  function filterRecipes(recipe) {
    let shouldInclude = true;

    // Condition pour le champ "titre"
    if (title.trim() !== '' && !recipe.titre.toLowerCase().includes(title.toLowerCase())) {
      shouldInclude = false;
    }

    // Condition pour le champ "niveau"
    if (selectValue !== '' && selectValue !== recipe.niveau) {
      shouldInclude = false;
    }

    // Condition pour le champ "temps"
    if (time !== '' && parseInt(time) !== recipe.tempsPreparation) {
      shouldInclude = false;
    }

    // Condition pour le champ min portion
    if (minPortion !== '' && parseInt(minPortion) > recipe.nombrePersonnes) {
      shouldInclude = false;
    }

    // Condition pour le champ max portion
    if (maxPortion !== '' && parseInt(maxPortion) < recipe.nombrePersonnes) {
      shouldInclude = false;
    }

    return shouldInclude;
  }

  const filteredRecipes = recipesList.filter(filterRecipes);

  return (
    <div className='recipes'>
      <div className='filters'>
        <input className='filter'
          type='text'
          name='title'
          value={title}
          placeholder='Filtrer par titre'
          onInput={(event) => setTitle(event.target.value)}
        />
        <select className='filter-difficulty'
          name='filter-difficulty'
          value={selectValue}
          onChange={e => setSelectValue(e.target.value)}
        >
          <option value='padawan'>Padawan</option>
          <option value='jedi'>Jedi</option>
          <option value='maitre'>Maître</option>
        </select>
        <input className='min-personne'
          type='number'
          name='min-portion'
          min={1}
          max={4}
          value={minPortion}
          onKeyDown={(e) => e.preventDefault()}
          onChange={(event) => setMinPortion(event.target.value)}
        />
        <input className='max-personne'
          type='number'
          name='max-portion'
          min={5}
          max={15}
          value={maxPortion}
          onKeyDown={(e) => e.preventDefault()}
          onChange={(event) => setMaxPortion(event.target.value)}
        />
        <input className='filter'
          type='number'
          name='PrepTime'
          min={1}
          max={150}
          placeholder='Temps prép. (min)'
          value={time}
          onKeyDown={(e) => e.preventDefault()}
          onInput={(event) => setTime(event.target.value)}
        />
        <button className='remove-filters'><FontAwesomeIcon className='cross-icon' icon={faSquareXmark} /></button>
      </div>

      <ul className='recipes-list'>
        {loading ? (
          <div>Loading...</div>
        ) : (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onDelete={handleRecipeDelete} onAdd={() => handleRecipeAdd(recipe.id)} />
          ))
        )}
      </ul>

    </div>
  );
}

export default RecipesList;
