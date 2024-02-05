import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
// stworzenie obiektu odtwarzacza vimeo
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

// ta linia kodu służy do ustawienia czasu ze zmiennej initialTime za pomocą metody setCurrentTime
player.setCurrentTime(initialTime);

// funkcja strzałkowa która posiada jeden parametr time
const saveCurrentTime = time => {
  // w localStorage nadpisujemy wartość z kluczem videoplayer-current-time na wartość parametru time przekształconego w string
  localStorage.setItem('videoplayer-current-time', time.toString());
};

// Dodaj nasłuchiwanie zdarzenia timeupdate z użyciem lodash.throttle
player.on(
  'timeupdate',
  throttle(data => {
    const currentTime = data.seconds;
    saveCurrentTime(currentTime);
  }, 1000)
); // 1000 milisekund = 1 sekunda
