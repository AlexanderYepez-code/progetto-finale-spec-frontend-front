import { Link } from "react-router-dom";

export default function Header() {

    return (

        <header>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary shadow">

                <div className="container">

                    {/* LOGO */}
                    <Link
                        className="navbar-brand fw-bold fs-3 text-warning"
                        to="/"
                    >
                        🎮 GameZone
                    </Link>

                    {/* BOTTONE MOBILE */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* MENU */}
                    <div
                        className="collapse navbar-collapse"
                        id="navbarNav"
                    >

                        <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">

                            <li className="nav-item">

                                <Link
                                    className="nav-link text-light fw-semibold"
                                    to="/"
                                >
                                    Home
                                </Link>

                            </li>

                            <li className="nav-item">

                                <Link
                                    className="nav-link text-light fw-semibold"
                                    to="/favorites"
                                >
                                    Preferiti
                                </Link>

                            </li>

                            {/* BARRA RICERCA */}
                            <li className="nav-item">

                                <form className="d-flex">

                                    <input
                                        className="form-control me-2"
                                        type="search"
                                        placeholder="Cerca gioco..."
                                    />

                                    <button
                                        className="btn btn-warning fw-bold"
                                        type="submit"
                                    >
                                        Cerca
                                    </button>

                                </form>

                            </li>

                        </ul>

                    </div>

                </div>

            </nav>

        </header>
    );
}