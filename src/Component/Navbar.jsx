import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../Styles/Navbar.css'
/* import logo from '../../public/img/cantina-logo.png'; */

function Navigationbar() {
    return (
        <div className='navbar'>
            {/* <img src={ logo } alt="" /> */}
            <h3>Homepage</h3>
            <button className='add-btn'>ajouter une recette <FontAwesomeIcon icon={faPlus} /></button>
        </div>
    );
}

export default Navigationbar;