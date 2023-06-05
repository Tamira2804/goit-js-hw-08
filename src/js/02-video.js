import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const updateTimeInStorage = throttle(function (currentTime) {
  localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000);

player.on('timeupdate', function (data) {
  const currentTime = data.seconds;
  updateTimeInStorage(currentTime);
});

player.on('play', function () {
  console.log('played the video!');

  const storedTime = localStorage.getItem('videoplayer-current-time');

  if (storedTime) {
    player.setCurrentTime(storedTime);
    localStorage.removeItem('videoplayer-current-time');
  }
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
