import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VideogameContext } from "../context/GlobalContext";

export default function CompareModal() {
    const {
        compareList,
        toggleCompare,
        PuliziaComparatore,
        isCompareOpen,
        setCompareOpen,
    } = useContext(VideogameContext);

    const [compareData, setCompareData] = useState([]);
    const [loadingCompare, setLoadingCompare] = useState(false);
    const url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (compareList.length === 0) {
            setCompareData([]);
            return;
        }
        async function fetchTutti() {
            setLoadingCompare(true);
            try {
                const requests = compareList.map((c) => fetch(`${url}/videogames/${c.id}`));
                const responses = await Promise.all(requests);
                const data = await Promise.all(responses.map((r) => r.json()));

                // ✅ estrai il campo videogame da ogni risposta
                const giochi = data.map((d) => d.videogame);
                setCompareData(giochi);

            } catch (err) {
                console.error("Errore comparatore", err);
            } finally {
                setLoadingCompare(false);
            }
        }

        fetchTutti();

    }, [compareList]);

    // ✅ il controllo va QUI — dopo tutti gli hook
    if (!isCompareOpen) return null;

    const close = () => setCompareOpen(false);
    const handleBackdrop = (e) => { if (e.target === e.currentTarget) close(); };

    if (!isCompareOpen) return null;

    return (
        <div className="cm-backdrop" onClick={handleBackdrop} role="dialog" aria-modal="true">
            <div className="cm-panel">

                {/* ── HEADER ── */}
                <div className="cm-header">
                    <h2 className="cm-title">🎮 Confronto Giochi</h2>
                    <div className="cm-header-actions">
                        <button className="cm-clear" onClick={PuliziaComparatore}>Svuota</button>
                        <button className="cm-close" onClick={close}>×</button>
                    </div>
                </div>

                {/* ── AVVISO meno di 2 ── */}
                {compareList.length < 2 && (
                    <p className="cm-hint">Seleziona almeno 2 giochi per confrontarli.</p>
                )}

                {/* ── LOADING ── */}
                {loadingCompare && (
                    <p className="cm-hint">Caricamento...</p>
                )}

                {/* ── CARDS CONFRONTO ── */}
                {!loadingCompare && compareData.length >= 2 && (
                    <div className="cm-cards">
                        {compareData.map((game) => (
                            <div key={game.id} className="cm-card">

                                {/* intestazione card */}
                                <div className="cm-card__head">
                                    <Link
                                        to={`/game/${game.id}`}
                                        className="cm-card__title"
                                        onClick={close}
                                    >
                                        {game.title}
                                    </Link>
                                    <button
                                        className="cm-card__remove"
                                        onClick={() => toggleCompare(game)}
                                        title="Rimuovi dal confronto"
                                    >
                                        ×
                                    </button>
                                </div>

                                {/* lista campi del gioco */}
                                <ul className="cm-card__list">
                                    <li><span>Categoria</span>    <strong>{game.category ?? "—"}</strong></li>
                                    <li><span>Genere</span>       <strong>{game.genre ?? "—"}</strong></li>
                                    <li><span>Piattaforme</span>  <strong>{game.platform?.join(", ") ?? "—"}</strong></li>
                                    <li><span>Sviluppatore</span> <strong>{game.developer ?? "—"}</strong></li>
                                    <li><span>Publisher</span>    <strong>{game.publisher ?? "—"}</strong></li>
                                    <li><span>Uscita</span>       <strong>{game.releaseDate ? new Date(game.releaseDate).toLocaleDateString("it-IT") : "—"}</strong></li>
                                    <li><span>Rating</span>       <strong>{game.rating !== undefined ? `⭐ ${game.rating}` : "—"}</strong></li>
                                    <li><span>Metacritic</span>   <strong>{game.metacritic !== undefined ? `${game.metacritic}/100` : "—"}</strong></li>
                                    <li><span>Prezzo</span>       <strong>{game.price !== undefined ? `${game.price} €` : "—"}</strong></li>
                                    <li><span>Scontato</span>     <strong>{game.discountedPrice !== undefined ? `${game.discountedPrice} €` : "—"}</strong></li>
                                    <li><span>Multiplayer</span>  <strong>{game.multiplayer ? "✅ Sì" : "❌ No"}</strong></li>
                                    <li><span>Online</span>       <strong>{game.online ? "✅ Sì" : "❌ No"}</strong></li>
                                    <li><span>PEGI</span>         <strong>{game.pegi !== undefined ? `PEGI ${game.pegi}` : "—"}</strong></li>
                                    <li><span>Tags</span>         <strong>{game.tags?.join(", ") ?? "—"}</strong></li>
                                </ul>

                            </div>
                        ))}
                    </div>
                )}

            </div>


        </div>
    );
}