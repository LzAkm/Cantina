import { useState, useEffect } from "react";
import { fetchRecipeData } from '../services/api.jsx';

export function useRecipe() {
    const [recipeData, setRecipeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        // Récupération des données de la recette
        const fetchData = async () => {
            try {
                const data = await fetchRecipeData();
                setRecipeData(data);
                setLoading(false);
            } catch (error) {
                setErrorMessage('Erreur lors de la récupération des données de la recette :' + error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { recipeData, loading, errorMessage };
}