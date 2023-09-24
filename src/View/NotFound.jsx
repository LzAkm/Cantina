import React from 'react';
import '../Styles/NotFound.css'
import yoda from '../assets/personnage-yoda.png'

function NotFound() {
  return (
    <div className='not-found-page'>
      <img className='yoda-img' src={yoda} />
      <h1>Page Not Found</h1>
      <p>La page que vous recherchez n'existe pas.</p>
    </div>
  );
}

export default NotFound;
