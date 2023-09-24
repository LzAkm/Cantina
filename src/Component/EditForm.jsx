import '../Styles/FormRecipe.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareMinus, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

function EditForm({ recipeToEdit, onSubmit }) {
    const [isOpen, setIsOpen] = useState(true); 

    const toggleForm = () => {
        setIsOpen(!isOpen);
    };

    const [recipe, setRecipe] = useState({
        photo: recipeToEdit ? recipeToEdit.photo : '',
        titre: recipeToEdit ? recipeToEdit.titre : '',
        description: recipeToEdit ? recipeToEdit.description : '',
        niveau: recipeToEdit ? recipeToEdit.niveau : '',
        personnes: recipeToEdit ? recipeToEdit.personnes : 0,
        tempsPreparation: recipeToEdit ? recipeToEdit.tempsPreparation : 0,
        ingredients: recipeToEdit ? recipeToEdit.ingredients : [{ quantity: '', unit: '', name: '' }],
        etapes: recipeToEdit ? recipeToEdit.etapes : [''],
    });

    // Gérer les changements dans les champs d'ingrédients
    const handleIngredientChange = (index, field, value) => {
        const updatedIngredients = [...recipe.ingredients];
        updatedIngredients[index][field] = value;
        setRecipe({ ...recipe, ingredients: updatedIngredients });
    };

    // Ajouter un nouvel ingrédient
    const addIngredient = () => {
        setRecipe({
            ...recipe,
            ingredients: [
                ...recipe.ingredients,
                { quantity: '', unit: '', name: '' },
            ],
        });
    };

    // Supprimer un ingrédient
    const removeIngredient = (index) => {
        const updatedIngredients = [...recipe.ingredients];
        updatedIngredients.splice(index, 1);
        setRecipe({ ...recipe, ingredients: updatedIngredients });
    };

    // Gérer les changements dans les champs de texte
    const [photoError, setPhotoError] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (!value.startsWith('https://') && !value.startsWith('http://')) {
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

    // Supprimer un champ d'étape ou d'ingrédient
    const removeStepIngredient = (index, field) => {
        const updatedArray = [...recipe[field]];
        updatedArray.splice(index, 1);
        setRecipe({ ...recipe, [field]: updatedArray });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(recipe);
        toggleForm();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='edit-form-header'>
                <h2>Modifier la recette</h2>
                <button className='close-btn'>
                    <FontAwesomeIcon icon={faSquareXmark} />
                </button>
            </div>
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
                    <label>Titre</label>
                    <input
                        type="text"
                        name="titre"
                        value={recipe.titre}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='field'>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={recipe.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='field'>
                    <label>Niveau de difficulté</label>
                    <select
                        name="niveau"
                        value={recipe.niveau}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="padawan">Padawan</option>
                        <option value="jedi">Jedi</option>
                        <option value="maitre">Maître</option>
                    </select>
                </div>
                <div className='field'>
                    <label>Nombre de personnes</label>
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
                    <label>Temps de préparation (en min)</label>
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
                    <label>Ingrédients</label>
                    {recipe.ingredients.map((ingredient, index) => (
                        <div className='form-ingredient' key={index}>
                            <input
                                type="number"
                                min={0}
                                placeholder="Quantité"
                                value={ingredient[0]}
                                onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                            />
                            <select
                                value={ingredient[1]}
                                onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                            >
                                <option value="dg">dg</option>
                                <option value="g">g</option>
                                <option value="ml">ml</option>
                                <option value="cl">cl</option>
                                <option value="L">L</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Ingrédient"
                                value={ingredient.name}
                                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
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
                    <label>Étapes de préparation</label>
                    {recipe.etapes.map((etape, index) => (
                        <div className='step' key={index}>
                            <input
                                type="text"
                                value={etape}
                                onChange={(event) => handleStepIngredientChange(index, event, 'etapes')}
                                required
                            />
                            <button className='minus' type="button" onClick={() => removeStepIngredient(index, 'etapes')}><FontAwesomeIcon className='minus-icon' icon={faSquareMinus} /></button>
                        </div>
                    ))}
                    <button className='add-step' type="button" onClick={() => addStepIngredient('etapes')}>Ajouter une étape</button>
                </div>
            </div>
            <button className='edit-recipe' type="submit">Modifier la recette</button>
        </form>
    );
}

export default EditForm;