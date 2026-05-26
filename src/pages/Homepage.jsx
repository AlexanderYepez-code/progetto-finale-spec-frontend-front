// HomePage.jsx

import { useContext , useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { VideogameContext } from "../context/GlobalContext";
import FavoritesSidebar from "../components/FavoritesSidebar";
import { useDebounce } from "../CustomHooks/useDebaunce";

export default function HomePage() {
    const {
        games,
        loading,
        toggleFavorite,
        favorites,
        compareList,
        toggleCompare,
        search,
        setSearch,
        category,
        setCategory,
        sort,
        setSort,
    } = useContext(VideogameContext);
        // stato locale per l'input — si aggiorna ad ogni tasto
    const [inputValue, setInputValue] = useState("");
 
    // valore debounced — cambia solo dopo 400ms di inattività
    const debouncedSearch = useDebounce(inputValue, 1000);
 
    // quando il debounced cambia, aggiorna il context
    useEffect(() => {
        setSearch(debouncedSearch);
    }, [debouncedSearch]);

    return (
        <div className="vg-page">

            {/* ── FILTRI ── */}
            <div className="vg-filters">

                {/* SEARCH */}
                <div className="vg-filters__search-wrap">
                    <span className="vg-filters__search-icon">🔍</span>
                    <input
                        className="vg-filters__search"
                        placeholder="Cerca gioco..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    {search && (
                        <button
                            className="vg-filters__search-clear"
                            onClick={() => setInputValue("")}
                            title="Cancella ricerca"
                        >
                            ×
                        </button>
                    )}
                </div>

                {/* CATEGORY */}
                <select
                    className="vg-filters__select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Tutte le categorie</option>
                    <option value="Action Adventure">Action Adventure</option> 
                    <option value="Action RPG">Action RPG</option>
                    <option value="First Person Shooter">First Person Shooter</option>
                    <option value="Fighting">Fighting</option>
                    <option value="RPG">RPG</option>
                    <option value="Platform / Co-op">Platform / Co-op</option>
                    <option value="Party / Rhythm">Party / Rhythm</option>
                    <option value="Racing">Racing</option>
                    <option value="Platform">Platform</option>
                    <option value="Survival">Esplorazione</option>
                    {/* ← aggiungi qui le altre categorie quando mi mandi i dati */}
                </select>

                {/* SORT */}
                <select
                    className="vg-filters__select"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="A-Z">A → Z</option>
                    <option value="Z-A">Z → A</option>
                </select>

                {/* CONTATORE RISULTATI */}
                {!loading && (
                    <span className="vg-filters__count">
                        {games.length} gioch{games.length === 1 ? "o" : "i"}
                    </span>
                )}

            </div>

            {/* ── BODY: lista + sidebar ── */}
            <div className="vg-body">

                {/* ── LISTA GIOCHI ── */}
                <main className="vg-main">

                    {loading && (
                        <p className="vg-loading">Caricamento giochi…</p>
                    )}

                    {!loading && games.length === 0 && (
                        <p className="vg-loading">Nessun gioco trovato.</p>
                    )}

                    <ul className="vg-list">
                        {games.map((game) => {
                            const isFav      = favorites.some((f) => f.id === game.id);
                            const inCompare  = compareList.some((c) => c.id === game.id);
                            const maxReached = compareList.length >= 3 && !inCompare;

                            return (
                                <li
                                    key={game.id}
                                    className={`vg-item ${inCompare ? "vg-item--comparing" : ""}`}
                                >
                                    <Link to={`/game/${game.id}`} className="vg-item__link">
                                        <span className="vg-item__title">{game.title}</span>
                                        <span className="vg-item__category">{game.category}</span>
                                    </Link>

                                    <div className="vg-item__actions">

                                        <button
                                            className={`vg-btn-fav ${isFav ? "vg-btn-fav--active" : ""}`}
                                            onClick={() => toggleFavorite(game)}
                                            title={isFav ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
                                        >
                                            {isFav ? "♥" : "♡"}
                                        </button>

                                        <label
                                            className={`vg-compare-label ${maxReached ? "vg-compare-label--disabled" : ""}`}
                                            title={maxReached ? "Massimo 3 giochi nel confronto" : "Aggiungi al confronto"}
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

                {/* ── SIDEBAR ── */}
                <FavoritesSidebar />

            </div>
        </div>
    );
}