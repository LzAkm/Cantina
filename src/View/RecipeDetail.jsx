import React from 'react';
import '../Styles/RecipesDetail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUser, faSpoon } from '@fortawesome/free-solid-svg-icons';
import yoda from '../assets/yoda-color.svg';
import { useRecipe } from '../Hooks/useRecipe.jsx';
import { useParams } from 'react-router-dom';


function RecipeDetail() {
  const { id } = useParams();
  const { recipeData, errorMessage, loading } = useRecipe(id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>Une erreur est survenue</div>
  }

  return (
    <div className='details-page'>
      <div className='details-content'>
        <div className='details-header'>
          <div className='title'>
            <h1>{recipeData.titre}</h1>
            <p className='description'>{recipeData.description}</p>
          </div>
          <h4>#{recipeData.id}</h4>
        </div>
        <figure>
          <img className='recipe-img' src={recipeData.photo} alt='photo de la recette' />
        </figure>
        <div className='principal-infos'>
          <div className='info'>
            <FontAwesomeIcon className='icon' icon={faUser} />
            <p>Portion : {recipeData.personnes} pers</p>
          </div>
          <div className='info'>
            <FontAwesomeIcon className='icon' icon={faClock} />
            <p>Temps de préparation : {recipeData.tempsPreparation} min</p>
          </div>
          <div className='info'>
            <FontAwesomeIcon className='icon' icon={faSpoon} />
            <p>Difficulté : {recipeData.niveau}</p>
          </div>
        </div>
        <hr className='separator2' />
        <div className='ingredients'>
          <h3>Les ingrédients</h3>
          <p>Pour cette recette vous allez avoir besoin de : </p>
          {recipeData.ingredients.map((ingredient, index) => {
            // Vérifiez si l'ingrédient existe (non vide)
            if (ingredient[0] && ingredient[1]) {
              return (
                <div className='ingredient' key={index}>
                  <input type='checkbox' />
                  <label>{ingredient[0]} {ingredient[1]}</label>
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className='steps'>
          <h3>Etapes pour réaliser la recette</h3>
          <div className='yoda-sentence'>
            <img src={yoda} alt='yoda icon' />
            <p className='citation'>: "Que la force soit avec toi."</p>
          </div>
          {recipeData.etapes.map((etape, index) => {
            // Vérifiez si l'étape existe (non vide)
            if (etape) {
              return (
                <div className='step' key={index}>
                  <div className='number'>{index + 1}</div>
                  <p>{etape}</p>
                </div>
              );
            }
            return null;
          })}
          <p className='final-sentence'>Servez vous et bon appétit !</p>
        </div>
        <div className='details-footer'>
          <button className='delete'>Supprimer la recette</button>
        </div>
      </div >
    </div >
  );
}

export default RecipeDetail;