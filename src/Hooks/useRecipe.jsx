import { useState, useEffect } from "react";
import { fetchRecipeData } from '../services/api.js';

export function useRecipe(recipeId) {
    const [recipeData, setRecipeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchRecipeData(recipeId);
                setRecipeData(data);
                setLoading(false);
            } catch (error) {
                setErrorMessage('Erreur lors de la récupération des données de la recette :' + error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [recipeId]);

    return { recipeData, loading, errorMessage };
}