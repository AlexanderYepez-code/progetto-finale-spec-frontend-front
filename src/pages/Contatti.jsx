import { useRef, useState } from "react";
import foto from "../assets/fotoProgettoFinale.webp"


export default function Contatti() {
const [email, setEmail] = useState("")
const inputNome = useRef()
const inputMessaggio = useRef()

const isValidEmail = email.trim() !== "" && email.includes("@")
function HandelSubmit(e) {
    e.preventDefault()
    if(isValidEmail){

        const objMessaggio = {
            email: email,
            nome: inputNome.current.value,
            messaggio: inputMessaggio.current.value
        }
        console.log("submit fatto",objMessaggio)
    }else{
        console.log("Errore nella copilazione del form")
    }
}



    return (
        <main className="vg-contact-page">

            <header className="vg-contact-header">
                <h1 className="vg-contact-title">
                    Contatti del creatore di questa pagina
                </h1>
                <p className="vg-contact-subtitle">
                    Informazioni, competenze e modulo di contatto.
                </p>
            </header>

            <section className="vg-contact-card">

                {/* PROFILO */}
                <div className="vg-contact-profile">

                    <div className="vg-contact-avatar">
                        <img src={foto} alt="" />
                    </div>

                    <div className="vg-contact-info">
                        <h2>Alexander Yepez</h2>

                        <p>
                            Junior Web Developer
                        </p>
                    </div>

                </div>

                {/* COMPETENZE */}
                <div className="vg-contact-section">

                    <h3 className="vg-contact-section-title">
                        Competenze
                    </h3>

                    <div className="vg-contact-skills">

                        <span className="vg-contact-skill">
                            HTML
                        </span>

                        <span className="vg-contact-skill">
                            CSS
                        </span>

                        <span className="vg-contact-skill">
                            JavaScript
                        </span>

                        <span className="vg-contact-skill">
                            REACT
                        </span>
                        <span className="vg-contact-skill">
                            TypesScript
                        </span>

                    </div>

                </div>

                {/* FORM */}
                <div className="vg-contact-section">

                    <h3 className="vg-contact-section-title">
                        Contattami
                    </h3>

                    <form className="vg-contact-form" onSubmit={HandelSubmit}>

                        <div className="vg-contact-field">
                            <label htmlFor="name">
                                Nome
                            </label>

                            <input
                                id="name"
                                type="text"
                                placeholder="Inserisci il tuo nome"
                                ref={inputNome}
                            />
                        </div>

                        <div className="vg-contact-field">
                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="Inserisci la tua email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <span className="vg-contact-subtitle">{isValidEmail? "": "inserire una mail con questo formato mail@mail.com"}</span>
                        </div>

                        <div className="vg-contact-field">
                            <label htmlFor="message">
                                Messaggio
                            </label>

                            <textarea
                                id="message"
                                rows="6"
                                placeholder="Scrivi il tuo messaggio"
                                ref={inputMessaggio}
                            />
                        </div>

                        <button
                            type="submit"
                            className="vg-contact-btn"
                        >
                            Invia Messaggio
                        </button>

                    </form>

                </div>

            </section>

        </main>
    );
}