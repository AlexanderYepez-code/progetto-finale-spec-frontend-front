export default function Footer() {

    return (

        <footer className="bg-dark text-light mt-5 border-top border-secondary">

            <div className="container py-4">

                <div className="row text-center text-md-start">

                    {/* BRAND */}
                    <div className="col-md-4 mb-3 mb-md-0">

                        <h5 className="text-warning fw-bold">
                            🎮 GameZone
                        </h5>

                        <p className="text-secondary small">
                            La tua piattaforma di videogiochi preferiti,
                            recensioni e collezioni personali.
                        </p>

                    </div>

                    {/* LINKS */}
                    <div className="col-md-4 mb-3 mb-md-0">

                        <h6 className="fw-bold">Navigazione</h6>

                        <ul className="list-unstyled">

                            <li>
                                <a href="/" className="text-light text-decoration-none">
                                    Home
                                </a>
                            </li>

                            <li>
                                <a href="/favorites" className="text-light text-decoration-none">
                                    Preferiti
                                </a>
                            </li>

                        </ul>

                    </div>

                    {/* SOCIAL / INFO */}
                    <div className="col-md-4">

                        <h6 className="fw-bold">Community</h6>

                        <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-2">

                            <a href="#" className="text-warning fs-5">
                                🎮
                            </a>

                            <a href="#" className="text-warning fs-5">
                                🕹️
                            </a>

                            <a href="#" className="text-warning fs-5">
                                👾
                            </a>

                        </div>

                    </div>

                </div>

                {/* BOTTOM */}
                <div className="text-center text-secondary small mt-4 border-top border-secondary pt-3">

                    © {new Date().getFullYear()} GameZone - Tutti i diritti riservati

                </div>

            </div>

        </footer>
    );
}