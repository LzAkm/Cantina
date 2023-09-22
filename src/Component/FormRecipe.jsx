import '../Styles/FormRecipe.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import { fetchAddRecipe } from '../services/api.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';

function FormRecipe() {
    const [recipe, setRecipe] = useState({
        photo: '',
        titre: '',
        description: '',
        niveau: '',
        personnes: 0,
        tempsPreparation: 0,
        ingredients: [{ quantity: '', unit: '', name: '' }],
        etapes: [''],
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

    const navigate = useNavigate();

    // Soumettre le formulaire
    const handleSubmit = () => {
        // Transformer les ingrédients en tableau
        const transformedIngredients = recipe.ingredients.map((ingredient) => [
            `${ingredient.quantity}${ingredient.unit}`,
            ingredient.name,
        ]);

        const newRecipe = {
            photo: recipe.photo,
            titre: recipe.titre,
            description: recipe.description,
            niveau: recipe.niveau,
            personnes: recipe.personnes,
            tempsPreparation: recipe.tempsPreparation,
            ingredients: transformedIngredients,
            etapes: recipe.etapes.filter((etape) => etape.trim() !== ''),
        };

        try {
            fetchAddRecipe(newRecipe);
            return navigate('/');
        } catch (error) {
            console.error("Erreur lors de l'ajout de la recette :", error.message);
        }

        toast.success('Votre recette a été ajoutée');
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
                                value={ingredient.quantity}
                                onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                            />
                            <select
                                value={ingredient.unit}
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
            <button className='add-recipe' type="submit">Publier la recette</button>
        </form>
    );
}

export default FormRecipe;