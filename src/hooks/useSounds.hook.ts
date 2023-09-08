export const useSounds = (audio: HTMLAudioElement) => {
  const play = (audio: HTMLAudioElement) => {
    audio.play();
  };

  const stop = (audio: HTMLAudioElement) => {
    audio.pause();
  };

  return {
    play,
    stop
  }
}