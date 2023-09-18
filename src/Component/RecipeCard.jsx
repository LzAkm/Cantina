import React, { useEffect, useState } from 'react';
import { fetchRecipeData } from '../services/api.jsx';
import '../Styles/RecipeCard.css';

function RecipeCard() {
  const [recipeData, setRecipeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Utilisez la fonction d'API pour récupérer les données de la recette
    const fetchData = async () => {
      try {
        const data = await fetchRecipeData();
        console.log(data);
        setRecipeData(data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de la recette :', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='recipe-card'>
      <img className='recipe-img' src={recipeData.photo} alt='' /> 
      <div className='recipe-body'>
        <h2>{recipeData.titre}</h2>
        <p>{recipeData.description}</p>
        <p>Niveau de difficulté : {recipeData.niveau}</p>
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
        <button className='details-btn'>En cuisine !</button>
      </div>
    </div>
  );
}

export default RecipeCard;
