import React, { Component } from 'react';
import { Ids, Seconds } from '../constants';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Shot from '../classes/Shot';
import JudgeEffect from '../classes/JudgeEffect';
import PlayerJudgeMarkCanvas from '../containers/PlayerJudgeMarkCanvas';
import PlayerNotesCanvas from '../containers/PlayerNotesCanvas';
import { triggerDon, triggerKa } from '../utils/sound';
import styled from 'styled-components';
import {
  calcNoteIndexRangeInSecondRange,
  calcInitialNoteX,
  calcNoteIndexRangeInCanvas,
} from '../utils/calculations';
import { isDon as isDonNote, isKa as isKaNote, hasState } from '../utils/note';
import { isDon as isDonKey, isKa as isKaKey } from '../utils/key';
import { clear, drawNote, drawJudgeEffect } from '../utils/canvas';
import Layer from '../styled/Layer';

const StyledSlider = styled(Slider)`
  && {
    width: 95%;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    margin: auto;
  }
`;

export default class Player extends Component {
  shots = [];
  judgeEffects = [];
  canvasRef = React.createRef();
  ctx = null;

  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext('2d');
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
      ytPlayerState,
      notes,
      states,
      playerPane,
      currentTime,
      config,
      setState,
    } = this.props;

    if (!isAutoMode || ytPlayerState !== Ids.YOUTUBE.PLAYING) {
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

      this.shots.push(new Shot(note, playerPane.width, playerPane.height));
      this.judgeEffects.push(
        new JudgeEffect(Ids.STATE.GOOD, playerPane.height)
      );

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
      ytPlayerState,
      currentTime,
      config,
      notes,
      states,
      playerPane,
      setState,
    } = this.props;

    if (isAutoMode || ytPlayerState !== Ids.YOUTUBE.PLAYING) {
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

      this.shots.push(new Shot(note, playerPane.width, playerPane.height));

      if (hasState(note)) {
        let newState = Ids.STATE.BAD;
        if (i >= goodRange[0] && i <= goodRange[1]) {
          newState = Ids.STATE.GOOD;
        } else if (i >= okRange[0] && i <= okRange[1]) {
          newState = Ids.STATE.OK;
        }
        setState(i, newState);
        this.judgeEffects.push(new JudgeEffect(newState, playerPane.height));
      }
      break;
    }
  };

  updateCanvas() {
    const { config, playerPane, currentTime, notes } = this.props;

    clear(this.ctx, playerPane.width - 1, playerPane.height - 1);

    const initialNoteX = calcInitialNoteX(
      currentTime,
      config.bpm.value,
      config.offset.value,
      config.speed.value
    );
    const canvasRange = calcNoteIndexRangeInCanvas(
      notes.length,
      config.speed.value,
      playerPane.width,
      initialNoteX
    );
    if (!canvasRange) {
      return;
    }

    // judgeEffects
    for (let i = this.judgeEffects.length - 1; i >= 0; i--) {
      this.judgeEffects[i].update();
      drawJudgeEffect(
        this.ctx,
        this.judgeEffects[i].judgeMarkY,
        this.judgeEffects[i].judgeTextY,
        this.judgeEffects[i].state
      );
      if (this.judgeEffects[i].limit < 0) {
        this.judgeEffects.splice(i, 1);
      }
    }

    // shots
    for (let i = this.shots.length - 1; i >= 0; i--) {
      this.shots[i].update(playerPane.width / 100, playerPane.height / 10);
      drawNote(
        this.ctx,
        this.shots[i].x,
        this.shots[i].y,
        'PLAYER',
        this.shots[i].note
      );
      if (this.shots[i].limit < 0) {
        this.shots.splice(i, 1);
      }
    }
  }

  render() {
    const {
      playerPane,
      ytPlayer,
      currentTime,
      setChangingSlider,
      setCurrentTime,
    } = this.props;

    return (
      <div>
        <PlayerJudgeMarkCanvas />
        <PlayerNotesCanvas />
        <Layer
          tabIndex={0}
          onKeyDown={this.playMode}
          innerRef={this.canvasRef}
          width={playerPane.width - 1}
          height={playerPane.height - 1}
        />
        <StyledSlider
          min={0}
          max={ytPlayer ? ytPlayer.getDuration() : 0}
          value={currentTime}
          onChange={value => {
            setChangingSlider(true);
            setCurrentTime(value);
          }}
          onAfterChange={() => {
            if (ytPlayer) {
              ytPlayer.seekTo(currentTime);
            }
            setChangingSlider(false);
          }}
        />
      </div>
    );
  }
}
