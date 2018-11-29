export const don = new Audio('/files/don.ogg');
export const ka = new Audio('/files/ka.ogg');

export const triggerDon = () => {
  don.currentTime = 0;
  don.play();
};

export const triggerKa = () => {
  ka.currentTime = 0;
  ka.play();
};
