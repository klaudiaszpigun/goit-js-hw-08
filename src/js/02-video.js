import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const savedTime = localStorage.getItem('videoplayer-current-time');

const initialTime = savedTime ? parseFloat(savedTime) : 0;

player.setCurrentTime(initialTime);

const saveCurrentTime = time => {
  localStorage.setItem('videoplayer-current-time', time.toString());
};

player.on(
  'timeupdate',
  throttle(data => {
    const currentTime = data.seconds;
    saveCurrentTime(currentTime);
  }),
  1000
);
