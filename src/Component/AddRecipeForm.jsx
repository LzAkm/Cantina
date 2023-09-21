import React, { useState } from 'react';
import '../Styles/AddRecipeForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddRecipeForm() {
    const [recipe, setRecipe] = useState({
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
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRecipe({ ...recipe, [name]: value });
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

    const newRecipe = {
        titre: recipe.titre,
        description: recipe.description,
        niveau: recipe.niveau,
        personnes: recipe.personnes,
        tempsPreparation: recipe.tempsPreparation,
        ingredients: recipe.ingredients.filter((ingredient) => 
            ingredient.quantity.trim() !== '' || 
            ingredient.unit.trim() !== '' || 
            ingredient.name.trim() !== ''
        ),
        etapes: recipe.etapes.filter((etape) => etape.trim() !== ''),
    };
    

    // Soumettre le formulaire
    const handleSubmit = () => {
        // Réinitialisez le formulaire
        setRecipe({
            titre: '',
            description: '',
            niveau: '',
            personnes: '',
            tempsPreparation: '',
            ingredients: [{ quantity: '', unit: '', name: '' }],
            etapes: [''],
        });

        toast.success('Votre recette a été ajoutée');
        console.log(newRecipe);
    };


    return (
        <div className='form-content'>
            <form onSubmit={handleSubmit}>
                <h2>Ajouter une nouvelle recette</h2>
                <div className='input-content'>
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
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />
        </div>
    );
}

export default AddRecipeForm;
