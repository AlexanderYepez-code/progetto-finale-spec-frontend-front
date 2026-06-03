export type Videogame = {
  // Obbligatorie per il backend
  title: string;
  category: string;

  // Informazioni gioco
  description: string;
  genre: string;
  platform: string[];

  // Dati tecnici
  developer: string;
  publisher: string;
  releaseDate: string;

  // Valutazioni
  rating: number;
  metacritic: number;

  // Prezzo
  price: number;
  discountedPrice?: number;

  // Media
  media: [string, string];

  // Extra
  multiplayer: boolean;
  online: boolean;
  pegi: number;

  // Tags utili per i filtri
  tags: string[];
};