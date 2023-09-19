import { useEffect, useState } from 'react';
import { fetchAllRecipes } from '../services/api.jsx';

export function useRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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