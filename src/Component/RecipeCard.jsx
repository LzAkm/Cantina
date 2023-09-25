import React, { useState } from 'react';
import '../Styles/RecipeCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useRecipe } from '../Hooks/useRecipe.jsx';
import DialogPopup from './DialogPopup.jsx';

function RecipeCard({ recipe, onDelete }) {
  const { recipeData, errorMessage, loading } = useRecipe(recipe.id);
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  }

  const handleConfirmDelete = () => {
    onDelete(recipe.id);
    setIsDialogOpen(false);
  };

  // Fonction pour gérer le clic sur le bouton d'édition
  const handleEditClick = () => {
    if (recipeData) {
      setIsEditing(true);
      console.log(recipeData);
    }
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

  // Gestionnaire pluriel/singulier du champs proportion
  let personsText = recipeData.personnes === 1 ? '1 personne' : `${recipeData.personnes} personnes`;

  return (
    <div className='recipe-card'>
      <div className='actions'>
        <button className='delete-btn' onClick={handleDeleteClick}><FontAwesomeIcon className='icon' icon={faTrash} /></button>
        <button className='edit-btn' onClick={handleEditClick}>
          <Link to={`/editRecipe/${recipe.id}`}>
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
            <p className='bold'>{personsText}</p>
          </div>
        </div>
      </div>
      <div className='recipe-footer'>
        <button className='details-btn'><Link className='link' to={`/recipes/${recipe.id}`}>En cuisine !</Link></button>
      </div>

      <DialogPopup
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        message="Voulez-vous vraiment supprimer la recette ?"
      />
    </div>
  );
}

export default RecipeCard;