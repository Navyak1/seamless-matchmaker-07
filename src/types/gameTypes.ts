
import { GeneratedImage } from "@/types/imageGenerationTypes";

export interface UserGuess {
  username: string;
  guess: string;
  timestamp: number;
}

export interface GameState {
  score: number;
  timeLeft: number;
  revealedTiles: boolean[];
  allTilesRevealed: boolean;
  isMuted: boolean;
  showWinner: boolean;
  totalImagesPlayed: number;
  isDisabled: boolean;
  isLoading: boolean;
  generatedImages: GeneratedImage[];
  currentImageIndex: number;
  userGuesses: UserGuess[];
  currentGuess: string;
}

export interface UseGameStateReturn extends GameState {
  getCurrentImage: () => string;
  getCurrentAnswer: () => string;
  handleTileClick: (index: number) => void;
  revealRandomTile: () => void;
  revealAllTiles: () => void;
  handleGuessSubmit: () => void;
  setCurrentGuess: (guess: string) => void;
  addUserGuess: (username: string, guess: string) => void;
  endGame: () => void;
  toggleMute: () => void;
}
