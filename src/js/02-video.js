import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
// zainicjowanie biblioteki vimeo
// zmienna player to video
const player = new Player(iframe);

// zmienna savedtime to pobrane dane z localStorage, są to pliki posiadające pliki .JSON, więc zmienna posiada string
const savedTime = localStorage.getItem('videoplayer-current-time');

/* if (savedTime != "" ) {
    savedTime = parseFloat(savedTime);
  }
  else {
    savedTime = 0;
  }
*/
const initialTime = savedTime ? parseFloat(savedTime) : 0;

const saveCurrentTime = time => {
  localStorage.setItem('videoplayer-current-time', time.toString());
};

player.setCurrentTime(initialTime);

// Dodaj nasłuchiwanie zdarzenia timeupdate z użyciem lodash.throttle
player.on(
  'timeupdate',
  throttle(data => {
    const currentTime = data.seconds;
    saveCurrentTime(currentTime);
  }, 1000)
); // 1000 milisekund = 1 sekunda
