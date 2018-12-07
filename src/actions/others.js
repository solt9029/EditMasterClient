import { ActionTypes } from '../constants';
import { createAction } from 'redux-actions';
import { exportTja } from '../utils/file';
import { triggerDon, triggerKa } from '../utils/sound';
import { calcNoteIndexRangeInSecondRange } from '../utils/calculations';
import { isDon as isDonNote, isKa as isKaNote, hasState } from '../utils/note';
import { isDon as isDonKey, isKa as isKaKey } from '../utils/key';
import { Ids, Seconds } from '../constants';
import {
  addBackgroundEffect,
  addFireworkEffect,
  addJudgeEffect,
  addShotEffect,
} from './effects';
import { updateState } from './score';

export const resetIDE = createAction(ActionTypes.RESET_IDE);
export const resetPlay = createAction(ActionTypes.RESET_PLAY);

export const exportTjaFile = () => {
  return (dispatch, getState) => {
    const { notes, videoId, bpm, offset } = getState().score;
    exportTja(notes.list, videoId.value, bpm.value, offset.value);
  };
};

/**
 *
 * @param {number} currentTime
 */
export const doAutoMode = currentTime => {
  return (dispatch, getState) => {
    const state = getState();
    const { player, score } = state;
    const { isAutoMode } = player;
    const { notes, states, offset, bpm } = score;

    if (!isAutoMode) {
      return;
    }

    const autoRange = calcNoteIndexRangeInSecondRange(
      Seconds.RANGE.AUTO,
      currentTime,
      bpm.value,
      offset.value
    );

    for (let i = autoRange[0]; i <= autoRange[1]; i++) {
      if (i < 0 || i >= notes.list.length) {
        continue;
      }

      const note = notes.list[i];
      const state = states.list[i];

      if (state !== Ids.STATE.FRESH || note === Ids.NOTE.SPACE) {
        continue;
      }

      dispatch(addShotEffect(note));
      dispatch(addBackgroundEffect(isDonNote(note)));

      if (hasState(note)) {
        dispatch(updateState({ index: i, state: Ids.STATE.GOOD }));
        dispatch(addFireworkEffect(Ids.STATE.GOOD));
        dispatch(addJudgeEffect(Ids.STATE.GOOD));
      }

      if (isDonNote(note)) {
        triggerDon();
      } else {
        triggerKa();
      }

      break;
    }
  };
};

/**
 *
 * @param {*} event
 */
export const doPlayMode = event => {
  return (dispatch, getState) => {
    const state = getState();
    const { player, score, youtube } = state;
    const { isAutoMode } = player;
    const { currentTime, ytPlayer } = youtube;
    const { notes, states, offset, bpm } = score;

    let isYouTubePlaying = false;
    if (ytPlayer) {
      isYouTubePlaying = ytPlayer.getPlayerState() === Ids.YOUTUBE.PLAYING;
    }
    if (isAutoMode || !isYouTubePlaying) {
      return;
    }

    const { key } = event.nativeEvent;
    dispatch(addBackgroundEffect(isDonKey(key)));

    if (isDonKey(key)) {
      triggerDon();
    } else if (isKaKey(key)) {
      triggerKa();
    }

    const badRange = calcNoteIndexRangeInSecondRange(
      Seconds.RANGE.BAD,
      currentTime,
      bpm.value,
      offset.value
    );
    const okRange = calcNoteIndexRangeInSecondRange(
      Seconds.RANGE.OK,
      currentTime,
      bpm.value,
      offset.value
    );
    const goodRange = calcNoteIndexRangeInSecondRange(
      Seconds.RANGE.GOOD,
      currentTime,
      bpm.value,
      offset.value
    );

    for (let i = badRange[0]; i <= badRange[1]; i++) {
      if (i < 0 || i >= notes.list.length) {
        continue;
      }

      const note = notes.list[i];
      const state = states.list[i];
      if (state !== Ids.STATE.FRESH || note === Ids.NOTE.SPACE) {
        continue;
      }

      let hit = false;
      if (
        (isDonKey(key) && isDonNote(note)) ||
        (isKaKey(key) && isKaNote(note))
      ) {
        hit = true;
      }
      if (!hit) {
        continue;
      }

      dispatch(addShotEffect(note));

      if (hasState(note)) {
        let newState = Ids.STATE.BAD;
        if (i >= goodRange[0] && i <= goodRange[1]) {
          newState = Ids.STATE.GOOD;
        } else if (i >= okRange[0] && i <= okRange[1]) {
          newState = Ids.STATE.OK;
        }
        dispatch(updateState({ index: i, state: newState }));
        dispatch(addJudgeEffect(newState));
        if (newState !== Ids.STATE.BAD) {
          dispatch(addFireworkEffect(newState));
        }
      }
      break;
    }
  };
};
