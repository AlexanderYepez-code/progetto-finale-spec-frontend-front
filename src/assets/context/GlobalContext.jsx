import { createContext, useState, useEffect } from "react";

export const VideogameContext = createContext(null);

export function VideogameProvider({ children }) {

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({});

    // Leggiamo i preferiti salvati nel localStorage
    const [favorites, setFavorites] = useState(() => {

        const savedFavorites = localStorage.getItem("favorites");

        // Se esistono preferiti salvati li convertiamo da JSON a array
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    // Funzione aggiunta/rimozione preferiti
    function toggleFavorite(game) {

        const isFavorite = favorites.some(
            item => item.id === game.id
        );

        let updatedFavorites;

        if (isFavorite) {

            updatedFavorites = favorites.filter(
                item => item.id !== game.id
            );

        } else {

            updatedFavorites = [...favorites, game];
        }

        // Aggiorniamo lo stato
        setFavorites(updatedFavorites);

        // Salviamo nel localStorage
        localStorage.setItem(
            "favorites",
            JSON.stringify(updatedFavorites)
        );
    }

    useEffect(() => {

        const fetchGames = async () => {

            setLoading(true);

            const params = new URLSearchParams();

            if (filters.search) {
                params.append("search", filters.search);
            }

            if (filters.category) {
                params.append("category", filters.category);
            }

            const query = params.toString();

            const url =
                `${import.meta.env.VITE_API_URL}/videogames${query ? `?${query}` : ""}`;

            const res = await fetch(url);

            const data = await res.json();

            setGames(data);

            setLoading(false);
        };

        fetchGames();

    }, [filters]);

    return (

        <VideogameContext.Provider
            value={{
                games,
                filters,
                setFilters,
                loading,
                favorites,
                toggleFavorite
            }}
        >
            {children}
        </VideogameContext.Provider>
    );
}