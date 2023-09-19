import React from 'react';
import '../Styles/RecipesDetail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUser, faSpoon } from '@fortawesome/free-solid-svg-icons';


function RecipeDetail() {

  return (
    <div className='details-page'>
      <div className='details-content'>
        <div className='details-header'>
          <h1>Titre de la recette</h1>
          <p>#ID</p>
        </div>
        <img src='#' alt='photo de la recette' />
        <div className='principal-infos'>
          <div className='info'>
            <FontAwesomeIcon className='icon' icon={faUser} />
            <p>Portion : 6 pers</p>
          </div>
          <div className='info'>
            <FontAwesomeIcon className='icon' icon={faClock} />
            <p>Temps de préparation : 45 min</p>
          </div>
          <div className='info'>
            <FontAwesomeIcon className='icon' icon={faSpoon} />
            <p>Difficulté : Jedi</p>
          </div>
        </div>
        <hr className='seperator'></hr>
        <div className='ingredients'>
          <h3>Les ingrédients</h3>
          <p>Pour cette recette vous allez avoir besoin de : </p>
          <div className='ingredient'>
            <input type='checkbox' />
            <label>5 oeufs</label>
          </div>
          <div className='ingredient'>
            <input type='checkbox' />
            <label>3 courgettes</label>
          </div>
          <div className='ingredient'>
            <input type='checkbox' />
            <label>3 poivrons</label>
          </div>
          <div className='ingredient'>
            <input type='checkbox' />
            <label>4 oignons</label>
          </div>
          <div className='ingredient'>
            <input type='checkbox' />
            <label>1 verre d'eau</label>
          </div>
        </div>
        <div className='steps'>
          <h3>Etapes pour réaliser la recette</h3>
          <div className='step'>
            <div className='number'>1</div>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas facilis est et expedita distinctio.</p>
          </div>
          <div className='step'>
            <div className='number'>2</div>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas facilis est et expedita distinctio.</p>
          </div>
          <div className='step'>
            <div className='number'>3</div>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas facilis est et expedita distinctio.</p>
          </div>
        </div>
        <div className='details-footer'>
          <button className='delete'>Supprimer la recette</button>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;