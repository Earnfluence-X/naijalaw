import { useCallback, useEffect, useRef } from 'react';
import { useStore } from '@/lib/store';
import { getSectionById } from '@/lib/searchEngine';

export function useAudio() {
  const { isPlaying, currentAudioSection, playSection, stopAudio, setPlaying, plainEnglishMode } = useStore();
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback(
    (text: string) => {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.lang = 'en-NG';

      // Try to find a suitable voice
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(
        (v) => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')
      ) || voices.find((v) => v.lang.startsWith('en'));
      if (englishVoice) utterance.voice = englishVoice;

      utterance.onend = () => {
        setPlaying(false);
      };
      utterance.onerror = () => {
        setPlaying(false);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [setPlaying]
  );

  const playSectionAudio = useCallback(
    (sectionId: string) => {
      const result = getSectionById(sectionId);
      if (!result) return;

      const { section } = result;
      const textToSpeak = plainEnglishMode && section.plainEnglish
        ? `Section ${section.number}. ${section.title}. ${section.plainEnglish}`
        : `Section ${section.number}. ${section.title}. ${section.content}`;

      playSection(sectionId);
      speak(textToSpeak);
    },
    [playSection, speak, plainEnglishMode]
  );

  const togglePlayback = useCallback(
    (sectionId: string) => {
      if (isPlaying && currentAudioSection === sectionId) {
        stopAudio();
      } else {
        playSectionAudio(sectionId);
      }
    },
    [isPlaying, currentAudioSection, stopAudio, playSectionAudio]
  );

  const pauseResume = useCallback(() => {
    if (!window.speechSynthesis) return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setPlaying(true);
    } else if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setPlaying(false);
    }
  }, [setPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    isPlaying,
    currentAudioSection,
    togglePlayback,
    pauseResume,
    stopAudio,
  };
}
