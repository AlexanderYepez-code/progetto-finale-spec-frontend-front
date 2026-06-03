// FavoritesPage.jsx
// Pagina dedicata ai giochi preferiti dell'utente
// Mostra griglia di card con info principali e bottone rimuovi

import { useContext } from "react";
import { Link } from "react-router-dom";
import { VideogameContext } from "../context/GlobalContext";

export default function FavoritesPage() {
    const { favorites, toggleFavorite, toggleCompare, compareList } = useContext(VideogameContext);

    const inCompare = (game) => compareList.some((c) => c.id === game.id);
    const maxReached = (game) => compareList.length >= 3 && !inCompare(game);

    return (
        <main className="bg_page">

            <div className="fav-page">

                {/* ── HEADER SEZIONE ── */}
                <div className="fav-page__header">
                    <h1 className="fav-page__title">
                        <span className="fav-page__title-icon"><i className="bi bi-heart-fill"></i></span>
                        I tuoi Preferiti
                    </h1>
                    <p className="fav-page__count">
                        {favorites.length === 0
                            ? "Nessun gioco salvato"
                            : `${favorites.length} gioch${favorites.length === 1 ? "o" : "i"} salvat${favorites.length === 1 ? "o" : "i"}`}
                    </p>
                </div>

                {/* ── STATO VUOTO ── */}
                {favorites.length === 0 ? (
                    <div className="fav-page__empty">
                        <p className="fav-page__empty-icon">🎮</p>
                        <p className="fav-page__empty-text">Non hai ancora aggiunto nessun gioco ai preferiti.</p>
                        <Link to="/" className="fav-page__empty-link">
                            ← Vai alla lista giochi
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* ── GRIGLIA CARD ── */}
                        <div className="fav-page__grid">
                            {favorites.map((game) => {
                                const comparing = inCompare(game);
                                const disabled = maxReached(game);

                                return (
                                    <div
                                        key={game.id}
                                        className={`fav-card ${comparing ? "fav-card--comparing" : ""}`}
                                    >

                                        {/* body card */}
                                        <div className="fav-card__body">

                                            <span className="fav-card__category">{game.category}</span>

                                            <Link to={`/game/${game.id}`} className="fav-card__title">
                                                {game.title}
                                            </Link>


                                        </div>

                                        {/* footer card: azioni */}
                                        <div className="fav-card__footer">

                                            {/* confronta */}
                                            <label
                                                className={`fav-card__compare-label ${disabled ? "fav-card__compare-label--disabled" : ""} ${comparing ? "fav-card__compare-label--active" : ""}`}
                                                title={disabled ? "Massimo 3 giochi nel confronto" : "Aggiungi al confronto"}
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="vg-compare-check"
                                                    checked={comparing}
                                                    disabled={disabled}
                                                    onChange={() => toggleCompare(game)}
                                                />
                                                <span>{comparing ? "Nel confronto" : "⇄ Confronta"}</span>
                                            </label>

                                            {/* rimuovi preferito */}
                                            <button
                                                className="fav-card__remove"
                                                onClick={() => toggleFavorite(game)}
                                                title="Rimuovi dai preferiti"
                                            >
                                                 Rimuovi
                                            </button>

                                        </div>

                                    </div>
                                );
                            })}
                        </div>

                        {/* ── LINK TORNA ALLA HOME ── */}
                        <div className="fav-page__back">
                            <Link to="/" className="fav-page__back-link">
                                ← Torna alla lista giochi
                            </Link>
                        </div>
                    </>
                )}

            </div>
        </main>
    );
}