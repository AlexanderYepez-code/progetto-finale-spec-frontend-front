// Ritarda l'aggiornamento di un valore fino a quando
// l'utente smette di digitare per `delay` millisecondi
 
import { useState, useEffect } from "react";
 
export function useDebounce(value, delay = 400) {
    const [debouncedValue, setDebouncedValue] = useState(value);
 
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
 
        // cleanup: cancella il timer se il valore cambia prima dello scadere
        return () => clearTimeout(timer);
    }, [value, delay]);
 
    return debouncedValue;
}
 