import { useEffect, useState } from 'react';
import { fetchAllRecipes } from '../services/api.js';

export function useRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('test changement de page');
        const fetchData = async () => {
            try {
                const data = await fetchAllRecipes();
                setRecipes(data);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des recettes :', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { recipes, loading}
}