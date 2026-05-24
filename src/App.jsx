// App.jsx
// Shell principale — monta CompareModal UNA sola volta qui
// così il modal è disponibile su TUTTE le pagine dell'app
// senza doverlo reimportare in ogni componente.
 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VideogameProvider } from "./assets/context/GlobalContext";
import CompareModal from "./assets/components/compareModal";
import HomePage from "./assets/pages/Homepage";
import Layout from "./assets/layout/layout"
// import DetailPage from "./pages/DetailPage"; // ← la tua pagina dettaglio
 
export default function App() {
    return (
        <VideogameProvider>
            <BrowserRouter>
 
                {/*
                    ✅ CompareModal sta QUI, fuori dalle Route.
                    Legge isCompareOpen dal context e si mostra
                    su qualsiasi pagina l'utente stia visitando.
                */}
                <CompareModal />
                <Layout>
                <Routes>
                    <Route path="/"           element={<HomePage />} />
                    {/* <Route path="/game/:id" element={<DetailPage />} /> */}
                </Routes>

                </Layout>
                
 
 
            </BrowserRouter>
        </VideogameProvider>
    );
}
