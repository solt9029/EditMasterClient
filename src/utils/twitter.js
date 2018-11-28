export const openWindow = id => {
  const text = '創作譜面をしました！';
  const url = `http://${window.location.host}/scores/${id}`;
  const hashtags = '創作の達人';
  let newWindow = window.open('', 'child', 'width=600, height=300');
  newWindow.location.href = `https://twitter.com/share?text=${text}&hashtags=${hashtags}&url=${url}&count=none&lang=ja`;
};
