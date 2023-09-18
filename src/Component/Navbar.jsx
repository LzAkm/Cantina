import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';


function Navigationbar() {
    return (
        <div className='navbar'>
            <ul>
                <li><a href="">Home</a></li>
            </ul>
            <button className='add-btn'>ajouter une recette <FontAwesomeIcon icon={faPlus} /></button>
        </div>
    );
}

export default Navigationbar;