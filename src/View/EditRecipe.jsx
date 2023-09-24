import React from 'react';
import EditForm from '../Component/EditForm';
import { useParams } from 'react-router';
import { useRecipe } from '../Hooks/useRecipe';

function EditRecipe() {
  const id = parseInt(useParams().id, 10);

  const {recipeData, loading} = useRecipe(id);

  return (
    <div className='form-content'>
      {!loading && recipeData &&
        <EditForm recipeToEdit={recipeData} />
      }
    </div>
  );
}

export default EditRecipe;
