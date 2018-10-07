export default class Sound {
  constructor() {
    this.don = new Audio('/files/don.ogg');
    this.ka = new Audio('/files/ka.ogg');
  }

  trigger(sound) {
    this[sound].currentTime = 0;
    this[sound].play();
  }
}
