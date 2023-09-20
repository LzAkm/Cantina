import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../Styles/Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../assets/cantina-logo.png';

function Navigationbar() {
    return (
        <div className='navbar'>
            <Link to='/'>
                <img src={logo} className='logo' alt="logo cantina"/> 
            </Link>
            <button className='add-btn'><Link to='/addRecipe'>ajouter une recette </Link><FontAwesomeIcon icon={faPlus} /></button>
        </div>
    );
}

export default Navigationbar;