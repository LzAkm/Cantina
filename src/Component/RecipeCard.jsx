import React from 'react';
import '../Styles/RecipeCard.css';
import { Link } from 'react-router-dom';
import { useRecipe } from '../Hooks/useRecipe.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

function RecipeCard({ recipe }) {
  const { recipeData, errorMessage, loading } = useRecipe(recipe.id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>Une erreur est survenue</div>
  }

  // Coloration du badge selon le niveau de difficulté
  let badgeClass = '';

  if (recipeData.niveau === 'padawan') {
    badgeClass = 'yellow';
  } else if (recipeData.niveau === 'jedi') {
    badgeClass = 'orange';
  } else if (recipeData.niveau === 'maitre') {
    badgeClass = 'red';
  }

  return (
    <div className='recipe-card'>
      <div className='actions'>
        <FontAwesomeIcon className='icon' icon={faTrash} />
        <FontAwesomeIcon className='icon' icon={faPen} />
      </div>
      <img className='recipe-img' src={recipeData.photo} alt='' />
      <div className='recipe-body'>
        <h2>{recipeData.titre}</h2>
        <p>{recipeData.description}</p>
        <div className={`badge ${badgeClass}`}>{recipeData.niveau}</div>
        <hr className='separator' />
        <div className='recipes-info'>
          <div className='prep-time'>
            <p className='grey'>Temps</p>
            <p className='bold'>{recipeData.tempsPreparation} min</p>
          </div>
          <div className='proportion'>
            <p className='grey'>Proportion</p>
            <p className='bold'>{recipeData.personnes} personnes</p>
          </div>
        </div>
      </div>
      <div className='recipe-footer'>
        <Link to={`/recipes/${recipe.id}`}>
          <button className='details-btn'>En cuisine !</button>
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;