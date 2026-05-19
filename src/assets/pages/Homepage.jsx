import { useContext, useEffect, useState } from "react";
import { VideogameContext } from "../context/GlobalContext";

export default function HomePage() {

    // 🔥 Prendiamo i dati globali dal Context
    // games = lista videogiochi
    // loading = stato caricamento API
    // toggleFavorite = funzione per aggiungere/rimuovere preferiti
    // favorites = array dei giochi preferiti
    const { games, loading, toggleFavorite, favorites } =
        useContext(VideogameContext);

    // 🖼️ Stato locale per salvare le immagini dei giochi
    // oggetto tipo: { 1: "/img1.jpg", 2: "/img2.jpg" }
    const [images, setImages] = useState([]);

    // ⚡ useEffect = si esegue quando cambia "games"
    useEffect(() => {

        // 📥 funzione asincrona per caricare le immagini
        async function loadImages() {

            // 📦 creiamo un oggetto vuoto dove salveremo:
            // id del gioco → immagine
            const newImages = {};

            // 🔁 cicliamo tutti i giochi ricevuti dal Context
            for (const game of games) {

                // 🌐 fetch del singolo videogioco per ottenere i dettagli
                // (perché /videogames NON contiene le immagini)
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/videogames/${game.id}`
                );

                // 🧾 trasformiamo la risposta in JSON
                const data = await res.json();

                // 🖼️ prendiamo la prima immagine dal campo media
                newImages[game.id] = data.videogame.media[0];
            }

            // 💾 salviamo tutte le immagini nello state
            setImages(newImages);
        }

        // 🚦 eseguiamo il fetch SOLO se ci sono giochi
        if (games.length > 0) {
            loadImages();
        }

    }, [games]); // 🔁 si attiva ogni volta che cambia la lista games

    return (

        // 📦 contenitore principale pagina
        <div className="container py-4">

            {/* 🏷️ titolo pagina */}
            <h1 className="text-center text-warning mb-4">
                🎮 Lista Videogiochi
            </h1>

            {/* ⏳ se loading è true mostriamo messaggio */}
            {loading && (
                <p className="text-center text-light">
                    Caricamento giochi...
                </p>
            )}

            {/* 🎯 griglia Bootstrap per le card */}
            <div className="row g-4">

                {/* 🔁 cicliamo tutti i giochi */}
                {games.map((game) => {

                    // ❤️ controlliamo se il gioco è nei preferiti
                    const isFavorite = favorites.some(
                        (item) => item.id === game.id
                    );

                    return (

                        // 📱 colonna responsive Bootstrap
                        <div
                            className="col-12 col-sm-6 col-md-4 col-lg-3"
                            key={game.id}
                        >

                            {/* 🎴 card del gioco */}
                            <div className="card bg-dark text-light h-100 shadow border-secondary">

                                {/* 🖼️ immagine del gioco */}
                                <img
                                    src={images[game.id]} // prende immagine dalla mappa
                                    className="card-img-top"
                                    alt={game.title}
                                    style={{
                                        height: "180px",
                                        objectFit: "cover"
                                    }}
                                />

                                {/* 📦 contenuto card */}
                                <div className="card-body d-flex flex-column">

                                    {/* 🎮 titolo */}
                                    <h5 className="card-title text-warning">
                                        {game.title}
                                    </h5>

                                    {/* 🏷️ categoria */}
                                    <p className="card-text text-secondary">
                                        {game.category}
                                    </p>

                                    {/* 💰 prezzo */}
                                    <p className="fw-bold">
                                        {game.price} €
                                    </p>

                                    {/* ❤️ bottone preferiti */}
                                    <button

                                        // 🎨 cambia colore in base se è nei preferiti
                                        className={`btn mt-auto ${
                                            isFavorite
                                                ? "btn-danger"
                                                : "btn-warning"
                                        }`}

                                        // ⚡ click per aggiungere/rimuovere preferiti
                                        onClick={() => toggleFavorite(game)}
                                    >

                                        {/* 🧠 testo dinamico bottone */}
                                        {isFavorite
                                            ? "Rimuovi preferiti"
                                            : "Aggiungi ai preferiti"
                                        }

                                    </button>

                                </div>

                            </div>

                        </div>

                    );
                })}

            </div>

        </div>
    );
}