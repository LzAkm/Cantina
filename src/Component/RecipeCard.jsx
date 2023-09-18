import React from 'react';
import '../Styles/RecipeCard.css';
import test from './plat-test.png'; 

function RecipeCard() {
  return (
    <div className='recipe-card'>
      <img className='recipe-img' src={ test } alt='' /> 
      <div className='recipe-body'>
        <h2>Recipe title</h2>
        <p>Navarin d'agneau, quinoa, légumes glacés et jus réduit épicé</p>
        <p>Niveau de difficulté : jedi</p>
        <hr className='separator' />
        <div className='recipes-info'>
            <div className='prep-time'>
                <p className='grey'>Temps</p>
                <p className='bold'>45 min</p>
            </div>
            <div className='proportion'>
                <p className='grey'>Proportion</p>
                <p className='bold'>6 personnes</p>
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