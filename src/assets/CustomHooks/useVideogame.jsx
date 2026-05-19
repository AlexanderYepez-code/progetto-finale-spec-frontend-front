// Hook personalizzato che semplifica l'accesso al contesto
// invece di scrivere useContext(VideogameContext) in ogni componente
// basta scrivere useVideogames()
export function useVideogames() {

  // Leggiamo il valore attuale del contesto
  const ctx = useContext(VideogameContext);

  // Se ctx è null significa che useVideogames è stato chiamato
  // fuori dal Provider, quindi lanciamo un errore esplicativo
  if (!ctx) throw new Error("useVideogames must be used within VideogameProvider");

  // Ritorniamo il contesto con tutti i valori: games, filters, setFilters, loading
  return ctx;
}