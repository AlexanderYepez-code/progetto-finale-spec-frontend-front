// FavoritesSidebar.jsx
// Sidebar che mostra i giochi preferiti con link al dettaglio
// e bottone per rimuoverli

import { useContext } from "react";
import { Link } from "react-router-dom";
import { VideogameContext } from "../context/GlobalContext";

export default function FavoritesSidebar() {
    const { favorites, toggleFavorite } = useContext(VideogameContext);

    return (
        <aside className="fsb">
            <h2 className="fsb__title">♥ Preferiti</h2>

            {favorites.length === 0 ? (
                <p className="fsb__empty">Nessun preferito ancora.</p>
            ) : (
                <ul className="fsb__list">
                    {favorites.map((game) => (
                        <li key={game.id} className="fsb__item">

                            {/* link al dettaglio */}
                            <Link to={`/game/${game.id}`} className="fsb__link">
                                <span className="fsb__name">{game.title}</span>
                                <span className="fsb__cat">{game.category}</span>
                            </Link>

                            {/* rimuovi */}
                            <button
                                className="fsb__remove"
                                onClick={() => toggleFavorite(game)}
                                title="Rimuovi dai preferiti"
                            >
                                ×
                            </button>

                        </li>
                    ))}
                </ul>
            )}

        </aside>
    );
}