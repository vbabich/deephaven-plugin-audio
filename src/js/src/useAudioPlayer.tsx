import { useCallback, useEffect, useRef } from "react";

type PlayFn = (url?: string) => void;

/**
 * Hook to play audio from a given URL
 * @param url URL of the audio to play
 * @returns Play function
 */
const useAudioPlayer = (url?: string): PlayFn => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (url == null) {
      return;
    }
    // Preload on init, don't autoplay until play is called
    const audio = new Audio(url);
    audio.autoplay = false;
    audio.preload = "auto";
    document.body.appendChild(audio);
    audioRef.current = audio;
    return () => {
      if (audio) {
        document.body.removeChild(audio);
      }
      audioRef.current = null;
    };
  }, [url]);

  const play = useCallback((url?: string) => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    if (url != null) {
      audio.src = url;
    }
    if (audio.paused) {
      audio.play();
    } else {
      audio.currentTime = 0;
    }
  }, []);

  return play;
};

export default useAudioPlayer;
