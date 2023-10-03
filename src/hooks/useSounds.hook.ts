export const useSounds = (audio: HTMLAudioElement) => {
  const play = (audio: HTMLAudioElement) => {
    audio.play();
  };

  const stop = (audio: HTMLAudioElement) => {
    audio.pause();
  };

  const fadeOutSound = (audio : HTMLAudioElement) => {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        audio.volume -= 0.1;
      }, i * 100);
    }
    setTimeout(() => {
      stop(audio);
    }, 1000);
  };

  return {
    play,
    stop,
    fadeOutSound
  }
}