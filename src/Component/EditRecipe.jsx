import React from 'react';
import '../Styles/EditRecipe.css';
import EditForm from './EditForm';

function EditRecipe({ recipeToEdit, onSubmit }) {

  const handleEditSubmit = (editedRecipe) => {
    console.log("Données de la recette à soumettre :", editedRecipe);
    onSubmit(editedRecipe);
  };

  return (
    <div className='form-content'>
      <EditForm recipeToEdit={recipeToEdit} onSubmit={handleEditSubmit} />
    </div>
  );
}

export default EditRecipe;
