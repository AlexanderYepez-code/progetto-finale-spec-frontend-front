// App.jsx
// Shell principale — monta CompareModal UNA sola volta qui
// così il modal è disponibile su TUTTE le pagine dell'app
// senza doverlo reimportare in ogni componente.

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VideogameProvider } from "./context/GlobalContext";
import CompareModal from "./components/compareModal";
import HomePage from "./pages/Homepage";
import Layout from "./layout/layout"
import DetailPage from "./pages/DetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import Contatti from "./pages/Contatti";

export default function App() {
    return (
        <VideogameProvider>
            <BrowserRouter>

                <CompareModal />
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/favorites" element = {<FavoritesPage/>}/>
                        <Route path="/game/:id" element={<DetailPage />} />
                        <Route path="/contatti" element={<Contatti/>}/>
                    </Routes>

                </Layout>



            </BrowserRouter>
        </VideogameProvider>
    );
}
