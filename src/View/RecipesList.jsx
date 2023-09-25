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
  /* const [minPortion, setMinPortion] = useState('');
  const [maxPortion, setMaxPortion] = useState(''); */
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    setRecipesList(recipes)
  }, [recipes])

  // Suppression d'une recette
  const handleRecipeDelete = async (recipeId) => {
    try {
      await fetchDeleteRecipe(recipeId);
      // Supression de la liste locale
      setRecipesList(recipesList.filter(r => r.id !== recipeId))
      console.log('Recette supprimée avec succès.');
    } catch (error) {
      console.error('Erreur lors de la suppression de la recette :', error.message);
    }
  };


  // Gestionnaire de filtres
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
    if (time !== '') {
      // Vérification du temps de préparation si le champ n'est pas vide
      if (parseInt(time) < recipe.tempsPreparation) {
        shouldInclude = false;
      }
    }

    /* // Condition pour le champ min portion
    if (minPortion !== '' && parseInt(minPortion) > recipe.nombrePersonnes) {
      shouldInclude = false;
    }

    // Condition pour le champ max portion
    if (maxPortion !== '' && parseInt(maxPortion) < recipe.nombrePersonnes) {
      shouldInclude = false;
    } */

    return shouldInclude;
  }

  // Gestion de la valeur de l'input
  const handleTimeInput = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    setTime(numericValue);
  };
  

  // Reinitialisation des filtres
  const handleRemoveFiltersClick = () => {
    setTitle('');
    setSelectValue('');
    setTime('');
  };


  // Filtrage des recettes
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
        {/* <input className='min-personne'
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
        /> */}
        <input
          className='filter'
          type='text'
          name='PrepTime'
          placeholder='Temps prép. (min)'
          value={time}
          onInput={handleTimeInput}
        />

        <button className='remove-filters' onClick={handleRemoveFiltersClick}><FontAwesomeIcon className='cross-icon' icon={faSquareXmark} /></button>
      </div>

      <ul className='recipes-list'>
        {loading ? (
          <div>Loading...</div>
        ) : (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onDelete={handleRecipeDelete} />
          ))
        )}
      </ul>

    </div>
  );
}

export default RecipesList;