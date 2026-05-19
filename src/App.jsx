import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

// Layout
import Header from "../src/assets/component/header";
import Footer from "./assets/component/footer";

// Pages
import HomePage from "./assets/pages/Homepage";
import FavoritesPage from "./assets/pages/FavoritesPage.jsx";

// Context
import { VideogameProvider } from "./assets/context/GlobalContext";

function App() {

    return (

        <VideogameProvider>

            <BrowserRouter>

                <div className="layout">

                    {/* HEADER */}
                    <Header />

                    {/* CONTENUTO PAGINE */}
                    <main className="main-content">

                        <Routes>

                            {/* HOME */}
                            <Route
                                path="/"
                                element={<HomePage />}
                            />

                            {/* PREFERITI */}
                            <Route
                                path="/favorites"
                                element={<FavoritesPage />}
                            />

                        </Routes>

                    </main>

                    {/* FOOTER */}
                    <Footer />

                </div>

            </BrowserRouter>

        </VideogameProvider>
    );
}

export default App;
