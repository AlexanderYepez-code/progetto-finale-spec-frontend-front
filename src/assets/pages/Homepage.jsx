// HomePage.jsx
// Layout: sidebar preferiti a destra, lista giochi a sinistra
// Ogni gioco è un link alla pagina dettaglio
// Ogni gioco ha una checkbox per il comparatore

import { useContext } from "react";
import { Link } from "react-router-dom";
import { VideogameContext } from "../context/GlobalContext";
import FavoritesSidebar from "../components/FavoritesSidebar";

export default function HomePage() {
    const {
        games,
        loading,
        toggleFavorite,
        favorites,
        compareList,
        toggleCompare,
        setCompareOpen,
    } = useContext(VideogameContext);

    return (
        <div className="vg-page">
            {/* ── HEADER ── */}


            {/* ── BODY: lista + sidebar ── */}
            <div className="vg-body">

                {/* ── LISTA GIOCHI ── */}
                <main className="vg-main">
                    {loading && (
                        <p className="vg-loading">Caricamento giochi…</p>
                    )}

                    <ul className="vg-list">
                        {games.map((game) => {
                            const isFav = favorites.some((f) => f.id === game.id);
                            const inCompare = compareList.some((c) => c.id === game.id);
                            const maxReached = compareList.length >= 3 && !inCompare;

                            return (
                                <li key={game.id} className={`vg-item ${inCompare ? "vg-item--comparing" : ""}`}>

                                    {/* 🔗 link alla pagina dettaglio */}
                                    <Link
                                        to={`/game/${game.id}`}
                                        className="vg-item__link"
                                    >
                                        <span className="vg-item__title">{game.title}</span>
                                        <span className="vg-item__category">{game.category}</span>
                                    </Link>

                                    {/* ── AZIONI ── */}
                                    <div className="vg-item__actions">

                                        {/* ❤️ toggle preferiti */}
                                        <button
                                            className={`vg-btn-fav ${isFav ? "vg-btn-fav--active" : ""}`}
                                            onClick={() => toggleFavorite(game)}
                                            title={isFav ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
                                        >
                                            {isFav ? "♥" : "♡"}
                                        </button>

                                        {/* ☑️ checkbox comparatore */}
                                        <label
                                            className={`vg-compare-label ${maxReached ? "vg-compare-label--disabled" : ""}`}
                                            title={
                                                maxReached
                                                    ? "Puoi confrontare massimo 3 giochi"
                                                    : "Aggiungi al confronto"
                                            }
                                        >
                                            <input
                                                type="checkbox"
                                                className="vg-compare-check"
                                                checked={inCompare}
                                                disabled={maxReached}
                                                onChange={() => toggleCompare(game)}
                                            />
                                            <span>Confronta</span>
                                        </label>

                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </main>

                {/* ── SIDEBAR PREFERITI ── */}
                <FavoritesSidebar />

            </div>

        </div>
    );
}