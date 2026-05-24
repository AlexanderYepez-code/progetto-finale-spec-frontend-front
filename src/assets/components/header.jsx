import { useCallback, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { VideogameContext } from "../context/GlobalContext";

export default function Header() {
        const {
        compareList,
        toggleCompare,
        setCompareOpen,
    } = useContext(VideogameContext);

    return (

            <header className="vg-header">
                <h1 className="vg-logo">🎮 GameVault</h1>

                {/* Bottone apri comparatore — visibile solo se ci sono giochi selezionati */}
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