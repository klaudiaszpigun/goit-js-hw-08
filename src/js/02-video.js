/*
1. X Zainicjalizuj odtwarzacz w pliku skryptu tak, jak opisano w sekcji pre-existing player, ale weź pod uwagę to, że odtwarzacz dodano jako pakiet npm, a nie poprzez CDN.
2. Zbadaj dokumentację metody on() i zacznij śledzić zdarzenie timeupdate - czyli aktualizacje czasu odtwarzania.
3. X Zapisuj czas odtwarzania w local storage. Niech kluczem w storage będzie "videoplayer-current-time".
4. X Przy przeładowywania strony używaj metody setCurrentTime() aby wznowić odtwarzanie od zapisanego momentu.
5. Dodaj do projektu bibliotekę lodash.throttle i zrób tak, aby czas odtwarzania aktualizował się w storage nie częściej niż raz na sekundę.
*/

import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

// pobieramy ze storage zestringowaną liczbę
const savedTimeJSON = localStorage.getItem('videoplayer-current-time');

// mamy już zmienną która przechowuje wartość z localStorage
const savedTime = savedTimeJSON ? parseFloat(savedTimeJSON) : 0;

// callback, mający parametr time który będzie stringowany i dodany jako wartość klucza w localStorage
const saveTimeToJSON = time => {
  localStorage.setItem('videoplayer-current-time', time.toString());
};

player.on(
  'timeupdate',
  throttle(data => {
    const currentTime = data.seconds;
    saveTimeToJSON(currentTime);
  }, 1000)
);
