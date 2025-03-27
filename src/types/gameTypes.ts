
import { GeneratedImage } from "@/utils/imageGenerationService";

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
}

export interface UseGameStateReturn extends GameState {
  getCurrentImage: () => string;
  getCurrentOptions: () => string[];
  getCurrentAnswer: () => string;
  handleTileClick: (index: number) => void;
  revealRandomTile: () => void;
  revealAllTiles: () => void;
  handleGuess: (option: string) => void;
  endGame: () => void;
  toggleMute: () => void;
}
