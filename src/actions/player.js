import { number } from '../constants';

export const setYtPlayer = ytPlayer => ({
  type: 'SET_YTPLAYER',
  payload: {
    ytPlayer,
  },
});

export const setYtPlayerState = ytPlayerState => ({
  type: 'SET_YTPLAYER_STATE',
  payload: {
    ytPlayerState,
  },
});

export const setCurrentTime = currentTime => ({
  type: 'SET_CURRENT_TIME',
  payload: {
    currentTime,
  },
});

export const toggleMode = () => ({
  type: 'TOGGLE_MODE',
});

export const setChangingSlider = isChangingSlider => ({
  type: 'SET_CHANGING_SLIDER',
  payload: {
    isChangingSlider,
  },
});

export const calcSecondsPerNote = bpm => {
  const barPerMinute = bpm / number.beat;
  const barPerSecond = barPerMinute / 60;
  const notesPerSecond = barPerSecond * number.score.column;
  const secondsPerNote = 1 / notesPerSecond;
  return setSecondsPerNote(secondsPerNote);
};

export const setSecondsPerNote = secondsPerNote => ({
  type: 'SET_SECONDS_PER_NOTE',
  payload: {
    secondsPerNote,
  },
});

export const setState = (index, state) => ({
  type: 'SET_STATE',
  payload: {
    index,
    state,
  },
});

export const resetState = () => ({
  type: 'RESET_STATE',
});
