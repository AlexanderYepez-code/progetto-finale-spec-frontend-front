export default function Footer() {
    return (
        <footer className="vg-footer">
 
            <div className="vg-footer__grid">
 
                {/* BRAND */}
                <div>
                    <p className="vg-footer__brand-name"> GameVault</p>
                    <p className="vg-footer__brand-desc">
                        La tua piattaforma di videogiochi preferiti,
                     ,il loro confronto e collezioni personali.
                    </p>
                </div>
 
                {/* NAV */}
                <div>
                    <p className="vg-footer__heading">Navigazione</p>
                    <ul className="vg-footer__nav">
                        <li><a href="/">Home</a></li>
                        <li><a href="/favorites">Preferiti</a></li>
                        <li><a href="/contatti">Contatti</a></li>
                    </ul>
                </div>
 
                {/* SOCIAL */}
                <div>
                    <p className="vg-footer__heading">Community</p>
                    <div className="vg-footer__socials">
                        <a href="#" className="vg-footer__social" aria-label="Gaming"><i className="bi bi-facebook"></i></a>
                        <a href="#" className="vg-footer__social" aria-label="Controller"><i className="bi bi-instagram"></i></a>
                        <a href="https://www.tiktok.com/@gamevaultbyte" className="vg-footer__social" aria-label="Arcade"><i className="bi bi-tiktok"></i></a>
                    </div>
                </div>
 
            </div>
 
            <div className="vg-footer__bottom">
                © {new Date().getFullYear()} GameVault — Tutti i diritti riservati
            </div>
 
        </footer>
    );
}