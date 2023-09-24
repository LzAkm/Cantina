import React, { useEffect, useState } from 'react';
import '../Styles/RecipeCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditRecipe from './EditRecipe';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteRecipe } from '../store/reducers/recipeSlice';
import { useRecipe } from '../Hooks/useRecipe.jsx';

function RecipeCard({ recipe, onEdit }) {
  const dispatch = useDispatch();
  const { recipeData, errorMessage, loading } = useRecipe(recipe.id);
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteClick = () => {
    dispatch(deleteRecipe(recipe.id));
  };

   // Fonction pour gérer le clic sur le bouton d'édition
   const handleEditClick = () => {
    if (recipeData) {
      // Les données de la recette sont maintenant disponibles
      console.log("Données de la recette à éditer :", recipeData);
      setIsEditing(true);
    }
  };

  // Soumission du formulaire 
  const handleEditSubmit = (editedRecipe) => {
    onEdit(editedRecipe);
    setIsEditing(false);
    console.log("Données de la recette :", recipeData);
  };

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
        <button className='delete-btn' onClick={handleDeleteClick}><FontAwesomeIcon className='icon' icon={faTrash} /></button>
        <button className='edit-btn' onClick={handleEditClick}>
          <Link to='/editRecipe'>
            <FontAwesomeIcon className='icon' icon={faPen} />
          </Link>
        </button>
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
            <p className='grey'>Portion</p>
            <p className='bold'>{recipeData.personnes} personnes</p>
          </div>
        </div>
      </div>
      <div className='recipe-footer'>
        <button className='details-btn'><Link to={`/recipes/${recipe.id}`}>En cuisine !</Link></button>
      </div>

      {isEditing && (
        <EditRecipe
          recipeData={recipeData}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
}

export default RecipeCard;