// GlobalContext.jsx
// Context globale — aggiunge la logica del COMPARATORE al context esistente
//
// Stato aggiunto:
//   compareList   — array di giochi selezionati (max 3)
//   isCompareOpen — booleano per aprire/chiudere il modal
//
// Azioni aggiunte:
//   toggleCompare(game)   — aggiunge o rimuove un gioco dal confronto
//   clearCompare()        — svuota la lista confronto
//   setCompareOpen(bool)  — apre o chiude il modal
//
// Il CompareModal va reso UNA sola volta nell'app shell (es. App.jsx)
// così è disponibile su tutte le pagine.

//Qui importiamo i hook neccesari, 
//createContext => crea il contestoglobale condivisibile    useState => gestiche lo stato del componente   useEffect => esegue side effect o effetti collaterali
import { createContext, useState, useEffect, useCallback } from "react"; // importiamo i hook neccesari per lo sviluppo dell' app da react

// esportiamo e creiamo il context che verra utilizzato dai componenti per asccedere asi dato glòobali senza props drilling
export const VideogameContext = createContext();

//exdportimao il provider
//questo componente avvolge l'applicazione e rendde disponibile tutti gli stati e le funzionicontenitui nel ontyext
export function VideogameProvider({ children }) {
    // State esistenti per i games e il loading
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("A-Z"); // oppure "Z-A"
    //QUi facciamo l'import per la url della chiamata
    const url = import.meta.env.VITE_API_URL

    const [compareList, setCompareList] = useState([]);
    const [isCompareOpen, setCompareOpen] = useState(false);

    // State per i preferiti e salvaimo nel local Staorage
    const [favorites, setFavorites] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("vg_favorites")) ?? []; // se json.parse = "trafroma queelo chge ce nel local storage che è una stringa json in un oggetto di javascript" è null allora prednio l'array vuoto (è un operatore Nullish coalescing )
        } catch {
            return []
        }
    });

    //Qui facciamo la chiamata api 
    useEffect(() => {
        //questa frunzione ritorna ujna promise che gestiamo trafromadona in json e facciamo un minimo di gestotiore errore 
        const getGames = async () => {
            try {
                const params = new URLSearchParams(); //oggeto che gestisce i parametri

                if (search) params.append("search", search);
                if (category) params.append("category", category);

                const response = await fetch(`${url}/videogames?${params}`);
                const data = await response.json();
                // ORDINAMENTO FRONTEND
                data.sort((a, b) => {
                    const fieldA = (a.title || "").toLowerCase();
                    const fieldB = (b.title || "").toLowerCase();

                    if (sort === "A-Z") return fieldA.localeCompare(fieldB);
                    if (sort === "Z-A") return fieldB.localeCompare(fieldA);
                    return 0;
                });
                setGames(data)
            } catch (error) {
                console.error(`Errore nella chiamata api `, error)
            } finally {
                // si esegue sempre anche se la operazione va in errore e mette in loading in false 
                setLoading(false)
            }


        }
        getGames()

    }, [search, category, sort]);
    // qui facciamo la sezione dei preferiti e la persistenza
    useEffect(() => {
        localStorage.setItem("vg_favorites", JSON.stringify(favorites)); // trafromiamo favorites in una stringa JSON 
    }, [favorites]);

    //funzione che toiglie o aggiunge i preeferiti se ci sono oppure no 
    const toggleFavorite = useCallback((game) => {
        setFavorites(prev =>
            prev.some(g => g.id === game.id)
                ? prev.filter(g => g.id !== game.id)
                : [...prev, game]
        );
    }, []);

    //togle per il comparatore
    const toggleCompare = (game) => {
        setCompareList((prev) => {
            const esisteGia = prev.some(g => g.id === game.id);
            // se esiste allora filtriamo e lo togliamo e restituiamo l'array filtrato, faccimao un controolo che se non ci sono piu elementi allora chiuddimao il comparatore 
            if (esisteGia) {
                const compare = prev.filter(p => p.id !== game.id)
                if (compare.length === 0) setCompareOpen(false);
                return compare;
            }
            // se il dato precedente e maggiore o uguale  a 3 allore returniamo il dato precendente 

            if (prev.length >= 3) return prev;

            // se tutte le condizione sono false allora retuniamo il dato precendete e aggiungiamo quello nuovo 
            return [...prev, game];
        });

    }

    // Funzione per lo svuotamento del comparatore 
    const clearCompare = () => {
        setCompareList([]);
        setCompareOpen(false);
    }

    const value = {
        //lista dei giroche e loading
        games, loading,
        //preferiti e la funzione che lo aggirna 
        favorites, toggleFavorite,
        search,
        setSearch,
        category,
        setCategory,
        sort,
        setSort,
        //Tutte gli stati e funzioner per far funzionare il comparatore
        compareList, toggleCompare, PuliziaComparatore: clearCompare, setCompareOpen, isCompareOpen

    }
    return (
        <VideogameContext.Provider value={value}>
            {children}
        </VideogameContext.Provider>
    );





}
