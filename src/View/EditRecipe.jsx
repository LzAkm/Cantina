import React from 'react';
import '../Styles/EditRecipe.css';
import EditForm from '../Component/EditForm';

function EditRecipe({ recipeToEdit, onSubmit }) {

  const handleEditSubmit = (editedRecipe) => {
    console.log("Données de la recette à soumettre :", editedRecipe);
    onSubmit(editedRecipe);
  };

  return (
    <div className='form-content'>
      <h1>Page de modification</h1>
      <EditForm recipeToEdit={recipeToEdit} onSubmit={handleEditSubmit} />
    </div>
  );
}

export default EditRecipe;
