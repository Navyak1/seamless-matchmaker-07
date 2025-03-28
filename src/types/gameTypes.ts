
import { GeneratedImage } from "@/types/imageGenerationTypes";

export interface UserGuess {
  username: string;
  guess: string;
  timestamp: number;
  isBot?: boolean;
  isTyping?: boolean;
  isCorrect?: boolean;
}

export interface GameState {
  score: number;
  timeLeft: number;
  revealedTiles: boolean[];
  allTilesRevealed: boolean;
  isMuted: boolean;
  showWinner: boolean;
  isWinner: boolean;
  totalImagesPlayed: number;
  isDisabled: boolean;
  isLoading: boolean;
  generatedImages: GeneratedImage[];
  currentImageIndex: number;
  userGuesses: UserGuess[];
  currentGuess: string;
  isStreaming: boolean;
  correctAnswer: string;
  showAnswer: boolean;
}

export interface UseGameStateReturn extends GameState {
  getCurrentImage: () => string;
  getCurrentAnswer: () => string;
  handleTileClick: (index: number) => void;
  revealRandomTile: () => void;
  revealAllTiles: () => void;
  handleGuessSubmit: () => void;
  setCurrentGuess: (guess: string) => void;
  addUserGuess: (username: string, guess: string, isBot?: boolean, isCorrect?: boolean) => void;
  endGame: (playerWins: boolean) => void;
  toggleMute: () => void;
  moveToNextImage: () => void;
}
