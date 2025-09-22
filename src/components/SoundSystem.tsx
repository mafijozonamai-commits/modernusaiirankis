import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

class SoundManager {
  private audioContext: AudioContext | null = null;
  private enabled = true;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (e) {
        console.warn('Web Audio API not supported');
      }
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.enabled || !this.audioContext) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    } catch (e) {
      console.warn('Could not play sound:', e);
    }
  }

  // Different notification sounds
  roundStart() {
    this.playTone(523.25, 0.2); // C5
    setTimeout(() => this.playTone(659.25, 0.2), 100); // E5
  }

  roundEnd() {
    this.playTone(659.25, 0.2); // E5
    setTimeout(() => this.playTone(523.25, 0.2), 100); // C5
  }

  timeWarning() {
    this.playTone(880, 0.1); // A5
    setTimeout(() => this.playTone(880, 0.1), 150);
  }

  success() {
    this.playTone(523.25, 0.1); // C5
    setTimeout(() => this.playTone(659.25, 0.1), 100); // E5
    setTimeout(() => this.playTone(783.99, 0.2), 200); // G5
  }

  achievement() {
    const notes = [523.25, 587.33, 659.25, 783.99]; // C5, D5, E5, G5
    notes.forEach((note, index) => {
      setTimeout(() => this.playTone(note, 0.15), index * 100);
    });
  }

  error() {
    this.playTone(220, 0.3, 'square'); // A3 with square wave for harsher sound
  }

  click() {
    this.playTone(800, 0.05);
  }

  typing() {
    if (Math.random() > 0.8) { // Only play occasionally while typing
      this.playTone(1000 + Math.random() * 500, 0.02);
    }
  }
}

export const soundManager = new SoundManager();

interface SoundToggleProps {
  className?: string;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({ className = '' }) => {
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    soundManager.setEnabled(newState);
    
    // Play a test sound when enabling
    if (newState) {
      soundManager.click();
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleSound}
      className={className}
      title={soundEnabled ? 'Disable sounds' : 'Enable sounds'}
    >
      {soundEnabled ? (
        <Volume2 className="h-4 w-4" />
      ) : (
        <VolumeX className="h-4 w-4" />
      )}
    </Button>
  );
};