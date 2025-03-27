
// Sound effect utilities
class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private muted: boolean = false;

  constructor() {
    // Preload sounds
    this.loadSound('reveal', '/sounds/reveal.mp3');
    this.loadSound('correct', '/sounds/correct.mp3');
    this.loadSound('wrong', '/sounds/wrong.mp3');
    this.loadSound('win', '/sounds/win.mp3');
    this.loadSound('lose', '/sounds/lose.mp3'); // Sound for losing
    this.loadSound('playerJoin', '/sounds/player-join.mp3');
    this.loadSound('countdown', '/sounds/countdown.mp3');
    this.loadSound('gameStart', '/sounds/game-start.mp3');
    this.loadSound('fireworks', '/sounds/fireworks.mp3');
  }

  private loadSound(name: string, path: string): void {
    const audio = new Audio(path);
    audio.preload = 'auto';
    this.sounds.set(name, audio);
  }

  public play(name: string): void {
    if (this.muted) return;
    
    const sound = this.sounds.get(name);
    if (sound) {
      // Reset to beginning if already playing
      sound.currentTime = 0;
      sound.play().catch(e => console.error('Error playing sound:', e));
    }
  }

  public setMuted(muted: boolean): void {
    this.muted = muted;
  }

  public isMuted(): boolean {
    return this.muted;
  }
}

// Singleton instance
export const soundManager = new SoundManager();

export default soundManager;
