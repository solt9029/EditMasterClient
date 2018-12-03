import React, { Component } from 'react';
import { Ids, Seconds } from '../constants';
import Slider from '../styled/Slider';
import PlayerJudgeMarkCanvas from '../containers/PlayerJudgeMarkCanvas';
import PlayerNotesCanvas from '../containers/PlayerNotesCanvas';
import PlayerShotsCanvas from '../containers/PlayerShotsCanvas';
import PlayerJudgeEffectsCanvas from '../containers/PlayerJudgeEffectsCanvas';
import { triggerDon, triggerKa } from '../utils/sound';
import { calcNoteIndexRangeInSecondRange } from '../utils/calculations';
import { isDon as isDonNote, isKa as isKaNote, hasState } from '../utils/note';
import { isDon as isDonKey, isKa as isKaKey } from '../utils/key';

export default class Player extends Component {
  componentDidMount() {
    this.updateCanvas();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  componentDidUpdate() {
    this.updateCanvas();
    this.autoMode();
  }

  autoMode() {
    const {
      isAutoMode,
      ytPlayer,
      notes,
      states,
      currentTime,
      config,
      setState,
    } = this.props;

    if (
      !isAutoMode ||
      (ytPlayer ? ytPlayer.getPlayerState() !== Ids.YOUTUBE.PLAYING : false)
    ) {
      return;
    }

    const autoRange = calcNoteIndexRangeInSecondRange(
      Seconds.RANGE.AUTO,
      currentTime,
      config.bpm.value,
      config.offset.value
    );

    for (let i = autoRange[0]; i <= autoRange[1]; i++) {
      if (i < 0 || i >= notes.length) {
        continue;
      }

      const note = notes[i];
      const state = states[i];

      if (state !== Ids.STATE.FRESH || note === Ids.NOTE.SPACE) {
        continue;
      }

      this.props.addShotEffect(note);
      this.props.addJudgeEffect(Ids.STATE.GOOD);

      if (hasState(note)) {
        setState(i, Ids.STATE.GOOD);
      }

      if (isDonNote(note)) {
        triggerDon();
      } else {
        triggerKa();
      }

      break;
    }
  }

  playMode = event => {
    const {
      isAutoMode,
      ytPlayer,
      currentTime,
      config,
      notes,
      states,
      setState,
    } = this.props;

    if (
      isAutoMode ||
      (ytPlayer ? ytPlayer.getPlayerState() !== Ids.YOUTUBE.PLAYING : false)
    ) {
      return;
    }

    const { key } = event.nativeEvent;

    if (isDonKey(key)) {
      triggerDon();
    }
    if (isKaKey(key)) {
      triggerKa();
    }

    const badRange = calcNoteIndexRangeInSecondRange(
      Seconds.RANGE.BAD,
      currentTime,
      config.bpm.value,
      config.offset.value
    );
    const okRange = calcNoteIndexRangeInSecondRange(
      Seconds.RANGE.OK,
      currentTime,
      config.bpm.value,
      config.offset.value
    );
    const goodRange = calcNoteIndexRangeInSecondRange(
      Seconds.RANGE.GOOD,
      currentTime,
      config.bpm.value,
      config.offset.value
    );

    for (let i = badRange[0]; i <= badRange[1]; i++) {
      if (i < 0 || i >= notes.length) {
        continue;
      }

      const note = notes[i];
      const state = states[i];
      if (state !== Ids.STATE.FRESH || note === Ids.NOTE.SPACE) {
        continue;
      }

      let hit = false;
      if (isDonKey(key) && isDonNote(note)) {
        hit = true;
      }
      if (isKaKey(key) && isKaNote(note)) {
        hit = true;
      }
      if (!hit) {
        continue;
      }

      this.props.addShotEffect(note);

      if (hasState(note)) {
        let newState = Ids.STATE.BAD;
        if (i >= goodRange[0] && i <= goodRange[1]) {
          newState = Ids.STATE.GOOD;
        } else if (i >= okRange[0] && i <= okRange[1]) {
          newState = Ids.STATE.OK;
        }
        setState(i, newState);
        this.props.addJudgeEffect(newState);
      }
      break;
    }
  };

  updateCanvas() {
    this.props.updateEffects();
  }

  render() {
    const {
      ytPlayer,
      currentTime,
      setIsSliderChanging,
      setCurrentTime,
    } = this.props;

    return (
      <div onKeyDown={this.playMode} tabIndex={0}>
        <PlayerJudgeMarkCanvas />
        <PlayerNotesCanvas />
        <PlayerShotsCanvas />
        <PlayerJudgeEffectsCanvas />
        <Slider
          min={0}
          max={ytPlayer ? ytPlayer.getDuration() : 0}
          value={currentTime}
          onChange={value => {
            setIsSliderChanging(true);
            setCurrentTime(value);
          }}
          onAfterChange={() => {
            if (ytPlayer) {
              ytPlayer.seekTo(currentTime);
            }
            setIsSliderChanging(false);
          }}
        />
      </div>
    );
  }
}
