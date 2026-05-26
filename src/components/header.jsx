// Header.jsx
// Header con logo, navigazione e bottone comparatore

import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { VideogameContext } from "../context/GlobalContext";

export default function Header() {
    const { compareList, setCompareOpen } = useContext(VideogameContext);

    return (
        <header className="vg-header">

            {/* ── LOGO ── */}
            <Link to="/" className="vg-logo">
                🎮 GameVault
            </Link>

            {/* ── NAV ── */}
            <nav className="vg-nav">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `vg-nav__link ${isActive ? "vg-nav__link--active" : ""}`
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/favorites"
                    className={({ isActive }) =>
                        `vg-nav__link ${isActive ? "vg-nav__link--active" : ""}`
                    }
                >
                    ♥ Preferiti
                </NavLink>

                <NavLink
                    to="/contacts"
                    className={({ isActive }) =>
                        `vg-nav__link ${isActive ? "vg-nav__link--active" : ""}`
                    }
                >
                    Contatti
                </NavLink>
            </nav>

            {/* ── BOTTONE COMPARATORE ── */}
            {compareList.length > 0 && (
                <button
                    className="vg-compare-trigger"
                    onClick={() => setCompareOpen(true)}
                >
                    Confronta ({compareList.length})
                </button>
            )}

        </header>
    );
}