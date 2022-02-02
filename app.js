import SONGS from './songs.js';

const APP = {
  init: () => {
    //when the page loads
    APP.getDurationValues();
  },
  getDurationValues: () => {
    SONGS.forEach((song) => {
      let audio = new Audio(song.src); //local variable
      audio.setAttribute('data-ref', song.name);
      audio.addEventListener('durationchange', APP.setDuration);
    });
  },
  setDuration: (ev) => {
    let audio = ev.target;
    let name = audio.getAttribute('data-ref');
    let time = document.querySelector(`li[data-ref="${name}"] time`);
    //displaying the time as seconds... you can convert to 00:00 format
    time.textContent = Math.round(audio.duration) + ' seconds';
    //remove the event listener and
    audio.removeEventListener('durationchange', APP.setDuration);
    //cut the reference to the audio object
    //so it can be garbage collected.
    audio = null;
  },
};

document.addEventListener('DOMContentLoaded', APP.init);
