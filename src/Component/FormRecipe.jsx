import '../Styles/FormRecipe.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import { fetchAddRecipe } from '../services/api.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function FormRecipe() {
    const [recipe, setRecipe] = useState({
        photo: '',
        titre: '',
        description: '',
        niveau: '',
        personnes: 0,
        tempsPreparation: 0,
        ingredients: [['', '']],
        etapes: [''],
    });

    // Gérer les changements dans les champs d'ingrédients
    const handleIngredientChange = (index, field, value) => {
        const updatedIngredients = [...recipe.ingredients];
        updatedIngredients[index] = [...updatedIngredients[index]];
        updatedIngredients[index][field] = value;
        setRecipe({ ...recipe, ingredients: updatedIngredients });
    };


    // Ajouter un nouvel ingrédient
    const addIngredient = () => {
        setRecipe({
            ...recipe,
            ingredients: [
                ...recipe.ingredients,
                ['', ''],
            ],
        });
    };

    // Gérer les changements dans les champs de texte
    const [photoError, setPhotoError] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Vérifier si le champ "photo" est rempli et que l'URL n'est pas valide
        if (name === 'photo' && value.trim() !== '' && !value.startsWith('http://') && !value.startsWith('https://')) {
            setPhotoError("⚠️ L'URL doit commencer par 'http://' ou 'https://'");
        } else {
            setPhotoError('');
        }
        const finalValue = event.target.type === "number" ? Number(value) : value
        setRecipe({ ...recipe, [name]: finalValue });
    };

    // Gérer les changements dans les champs d'étapes et d'ingrédients
    const handleStepIngredientChange = (index, event, field) => {
        const newValue = event.target.value;
        const updatedArray = [...recipe[field]];
        updatedArray[index] = newValue;
        setRecipe({ ...recipe, [field]: updatedArray });
    };

    // Ajouter un champ d'étape ou d'ingrédient
    const addStepIngredient = (field) => {
        setRecipe({ ...recipe, [field]: [...recipe[field], ''] });
    };

    // Supprimer un ingrédient
    const removeIngredient = (index) => {
        if (index > 0) { // Vérifier que l'index n'est pas le premier
            const updatedIngredients = [...recipe.ingredients];
            updatedIngredients.splice(index, 1);
            setRecipe({ ...recipe, ingredients: updatedIngredients });
        }
    };

    // Supprimer un champ d'étape ou d'ingrédient
    const removeStepIngredient = (index, field) => {
        if (index > 0) { // Vérifier que l'index n'est pas le premier
            const updatedArray = [...recipe[field]];
            updatedArray.splice(index, 1);
            setRecipe({ ...recipe, [field]: updatedArray });
        }
    };

    const navigate = useNavigate();

    // Soumettre le formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newRecipe = {
            photo: recipe.photo,
            titre: recipe.titre,
            description: recipe.description,
            niveau: recipe.niveau,
            personnes: recipe.personnes,
            tempsPreparation: recipe.tempsPreparation,
            ingredients: recipe.ingredients,
            etapes: recipe.etapes.filter((etape) => etape.trim() !== ''),
        };


        try {
            await fetchAddRecipe(newRecipe);
            toast.success('Recette ajoutée avec succès', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return navigate('/');
        } catch (error) {
            console.error("Erreur lors de l'ajout de la recette :", error.message);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <h2>Ajouter une nouvelle recette</h2>
            <div className='input-content'>
                <div className='field'>
                    <label>Photo de la recette</label>
                    <input
                        type='url'
                        name='photo'
                        value={recipe.photo}
                        onChange={handleInputChange}
                        placeholder='https://...'
                    />
                    {photoError && <p className='error-message'>{photoError}</p>}
                </div>
                <div className='field'>
                    <label>
                        Titre
                        <span className='required'>*</span>
                    </label>
                    <input
                        type="text"
                        name="titre"
                        value={recipe.titre}
                        placeholder='Titre'
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='field'>
                    <label>
                        Description
                        <span className='required'>*</span>
                    </label>
                    <textarea
                        name="description"
                        placeholder='Description'
                        value={recipe.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='field'>
                    <label>
                        Niveau de difficulté
                        <span className='required'>*</span>
                    </label>
                    <select
                        name="niveau"
                        value={recipe.niveau}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="" disabled selected>Choisissez le niveau</option>
                        <option value="padawan">Padawan</option>
                        <option value="jedi">Jedi</option>
                        <option value="maitre">Maître</option>
                    </select>
                </div>
                <div className='field'>
                    <label>
                        Nombre de personnes
                        <span className='required'>*</span>
                    </label>
                    <input
                        type="number"
                        name="personnes"
                        value={recipe.personnes}
                        onChange={handleInputChange}
                        min="1"
                        required
                    />
                </div>
                <div className='field'>
                    <label>
                        Temps de préparation (en min)
                        <span className='required'>*</span>

                    </label>
                    <input
                        type="number"
                        name="tempsPreparation"
                        value={recipe.tempsPreparation}
                        onChange={handleInputChange}
                        min="1"
                        required
                    />
                </div>
                <div className='form-ingredients'>
                    <label>
                        Ingrédients
                        <span className='required'>*</span>
                    </label>
                    {recipe.ingredients.map((ingredient, index) => (
                        <div className='form-ingredient' key={index}>
                            <input
                                type="text"
                                placeholder="Quantité"
                                min={1}
                                value={ingredient[0]}
                                onChange={(e) => handleIngredientChange(index, 0, e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Ingrédient"
                                value={ingredient[1]}
                                onChange={(e) => handleIngredientChange(index, 1, e.target.value)}
                            />
                            <button className='minus' type="button" onClick={() => removeIngredient(index)}>
                                <FontAwesomeIcon className='minus-icon' icon={faSquareMinus} />
                            </button>
                        </div>
                    ))}
                    <button className='add-ingredient' type="button" onClick={addIngredient}>
                        Ajouter un ingrédient
                    </button>
                </div>

                <div className='steps'>
                    <label>
                        Étapes de préparation
                        <span className='required'>*</span>
                    </label>
                    {recipe.etapes.map((etape, index) => (
                        <div className='step' key={index}>
                            <textarea
                                type="text"
                                value={etape}
                                placeholder='Etape de préparation'
                                onChange={(event) => handleStepIngredientChange(index, event, 'etapes')}
                                required
                            />
                            <button className='minus' type="button" onClick={() => removeStepIngredient(index, 'etapes')}><FontAwesomeIcon className='minus-icon' icon={faSquareMinus} /></button>
                        </div>
                    ))}
                    <button className='add-step' type="button" onClick={() => addStepIngredient('etapes')}>Ajouter une étape</button>
                </div>
            </div>
            <button className='add-recipe' type="submit">Publier la recette</button>
        </form>

    );
}

export default FormRecipe;