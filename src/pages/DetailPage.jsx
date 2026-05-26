// GameDetail.jsx
// Layout a due colonne: contenuto principale + sidebar preferiti

import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { VideogameContext } from "../context/GlobalContext";
import FavoritesSidebar from "../components/FavoritesSidebar";

function GameDetail() {

    const { id } = useParams();
    const navigate = useNavigate();

    const {
        favorites,
        toggleFavorite,
        compareList,
        toggleCompare
    } = useContext(VideogameContext);

    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);

    const url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const getGame = async () => {
            try {
                const response = await fetch(`${url}/videogames/${id}`);
                const data = await response.json();
                setGame(data.videogame);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getGame();
    }, [id]);

    if (loading) return <p className="loading">Caricamento...</p>;
    if (!game) return <p className="loading">Gioco non trovato.</p>;

    const isFav = favorites.some(f => f.id === game.id);
    const inCompare = compareList.some(c => c.id === game.id);

    return (
        <main className="bg_page">

            {/* /* stesso grid della homepage: contenuto | sidebar */}
            <div className="vg-body">

                {/* ── COLONNA PRINCIPALE ── */}
                <div className="vg-main">
                    <div className="game-detail">

                        {/* HERO */}
                        <section className="game-detail__hero">

                            <div className="game-detail__image">
                                <img src={game.media?.[0]} alt={game.title} />
                            </div>

                            <div className="game-detail__info">

                                <span className="game-detail__category">
                                    {game.category}
                                </span>

                                <h1 className="game-detail__title">
                                    {game.title}
                                </h1>

                                <p className="game-detail__description">
                                    {game.description}
                                </p>

                                {/* META */}
                                <div className="game-detail__meta">
                                    <div className="game-detail__meta-card">
                                        <span>⭐ Rating</span>
                                        <strong>{game.rating}</strong>
                                    </div>
                                    <div className="game-detail__meta-card">
                                        <span>🎮 Metacritic</span>
                                        <strong>{game.metacritic}</strong>
                                    </div>
                                    <div className="game-detail__meta-card">
                                        <span>🔞 PEGI</span>
                                        <strong>{game.pegi}</strong>
                                    </div>
                                    <div className="game-detail__meta-card">
                                        <span>💰 Prezzo</span>
                                        <strong>{game.price}€</strong>
                                    </div>
                                </div>

                                {/* ACTIONS */}
                                <div className="game-detail__actions">
                                    <button
                                        className={`game-detail__fav ${isFav ? "is-active" : ""}`}
                                        onClick={() => toggleFavorite(game)}
                                    >
                                        {isFav ? "♥ Nei preferiti" : "♡ Aggiungi ai preferiti"}
                                    </button>

                                    <button
                                        className={`game-detail__compare ${inCompare ? "is-active" : ""}`}
                                        onClick={() => toggleCompare(game)}
                                    >
                                        {inCompare ? "✔ Nel confronto" : "⇄ Confronta"}
                                    </button>

                                    <button
                                        className="back-btn"
                                        onClick={() => navigate(-1)}
                                    >
                                        ← Indietro
                                    </button>
                                </div>

                                {/* STATUS */}
                                <div className="game-detail__status">
                                    {isFav && (
                                        <p className="status fav">❤️ Questo gioco è nei tuoi preferiti</p>
                                    )}
                                    {inCompare && (
                                        <p className="status compare">🔄 Incluso nel confronto</p>
                                    )}
                                </div>

                            </div>
                        </section>

                        {/* EXTRA */}
                        <section className="game-detail__extra">
                            <div className="game-detail__card">
                                <h3>Developer</h3>
                                <p>{game.developer}</p>
                            </div>
                            <div className="game-detail__card">
                                <h3>Publisher</h3>
                                <p>{game.publisher}</p>
                            </div>
                            <div className="game-detail__card">
                                <h3>Release</h3>
                                <p>{new Date(game.releaseDate).toLocaleDateString("it-IT")}</p>
                            </div>
                            <div className="game-detail__card">
                                <h3>Platform</h3>
                                <div className="game-detail__platforms">
                                    {game.platform?.map((p, i) => (
                                        <span key={i}>{p}</span>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* TAGS */}
                        <section className="game-detail__tags">
                            <h2>Tags</h2>
                            <div className="game-detail__tags-container">
                                {game.tags?.map((tag, i) => (
                                    <span key={i} className="game-detail__tag">{tag}</span>
                                ))}
                            </div>
                        </section>

                        {/* GALLERY */}
                        <section className="game-detail__gallery">
                            <h2>Gallery</h2>
                            <div className="game-detail__gallery-grid">
                                {game.media?.map((img, i) => (
                                    <img key={i} src={img} alt={game.title} />
                                ))}
                            </div>
                        </section>

                    </div>
                </div>

                {/* ── SIDEBAR PREFERITI ── */}
                <FavoritesSidebar />

            </div>
        </main>
    );
}

export default GameDetail;