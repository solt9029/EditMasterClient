import React, { Component } from 'react';
import { numbers, ids, seconds, percentages } from '../constants';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Shot from '../classes/Shot';
import JudgeEffect from '../classes/JudgeEffect';
import { triggerDon, triggerKa } from '../utils/sound';
import styled from 'styled-components';
import {
  calcNoteIndexRangeInSecondRange,
  calcInitialNoteX,
  calcNoteIndexRangeInCanvas,
} from '../utils/calculations';
import { isDon as isDonNote, isKa as isKaNote, hasState } from '../utils/note';
import { isDon as isDonKey, isKa as isKaKey } from '../utils/key';
import {
  clear,
  drawNote,
  drawBarStartLine,
  drawJudgeMark,
  drawJudgeEffect,
} from '../utils/canvas';
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

    if (!isAutoMode || ytPlayerState !== ids.YOUTUBE.PLAYING) {
      return;
    }

    const autoRange = calcNoteIndexRangeInSecondRange(
      seconds.RANGE.AUTO,
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

      if (state !== ids.STATE.FRESH || note === ids.NOTE.SPACE) {
        continue;
      }

      this.shots.push(new Shot((playerPane.height - 1) / 2, note));
      this.judgeEffects.push(
        new JudgeEffect((playerPane.height - 1) / 2, ids.STATE.GOOD)
      );

      if (hasState(note)) {
        setState(i, ids.STATE.GOOD);
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

    if (isAutoMode || ytPlayerState !== ids.YOUTUBE.PLAYING) {
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
      seconds.RANGE.BAD,
      currentTime,
      config.bpm.value,
      config.offset.value
    );
    const okRange = calcNoteIndexRangeInSecondRange(
      seconds.RANGE.OK,
      currentTime,
      config.bpm.value,
      config.offset.value
    );
    const goodRange = calcNoteIndexRangeInSecondRange(
      seconds.RANGE.GOOD,
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
      if (state !== ids.STATE.FRESH || note === ids.NOTE.SPACE) {
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

      this.shots.push(new Shot((playerPane.height - 1) / 2, note));

      if (hasState(note)) {
        let newState = ids.STATE.BAD;
        if (i >= goodRange[0] && i <= goodRange[1]) {
          newState = ids.STATE.GOOD;
        } else if (i >= okRange[0] && i <= okRange[1]) {
          newState = ids.STATE.OK;
        }
        setState(i, newState);
        this.judgeEffects.push(
          new JudgeEffect((playerPane.height - 1) / 2, newState)
        );
      }
      break;
    }
  };

  updateCanvas() {
    const { config, playerPane, currentTime, notes, states } = this.props;

    const spaceWidth =
      config.speed.value * percentages.PLAYER.SPEED_TO_SPACE_WIDTH;

    clear(this.ctx, playerPane.width - 1, playerPane.height - 1);
    drawJudgeMark(this.ctx, (playerPane.height - 1) / 2);

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
      this.judgeEffects[i].move(playerPane.height / 50);
      drawJudgeEffect(
        this.ctx,
        this.judgeEffects[i].judgeMarkY,
        this.judgeEffects[i].judgeTextY,
        this.judgeEffects[i].stateId
      );
      if (this.judgeEffects[i].limit < 0) {
        this.judgeEffects.splice(i, 1);
      }
    }

    // bar start lines
    const initialBarStartLineIndex =
      canvasRange[0] - (canvasRange[0] % numbers.NOTES_PER_BAR);
    for (
      let i = initialBarStartLineIndex;
      i <= canvasRange[1];
      i += numbers.NOTES_PER_BAR
    ) {
      const x = initialNoteX + i * spaceWidth;
      drawBarStartLine(this.ctx, x, playerPane.height - 1);
    }

    // notes
    for (let i = canvasRange[1]; i >= canvasRange[0]; i--) {
      const note = notes[i];
      const noteState = states[i];
      const x = initialNoteX + i * spaceWidth;

      if (noteState !== ids.STATE.FRESH || note === ids.NOTE.SPACE) {
        continue;
      }

      const y = (playerPane.height - 1) / 2;
      const previousNote = i > 0 ? notes[i - 1] : ids.NOTE.SPACE;
      const nextNote = i < notes.length - 1 ? notes[i + 1] : ids.NOTE.SPACE;

      drawNote(
        this.ctx,
        x,
        y,
        'PLAYER',
        note,
        spaceWidth,
        previousNote,
        nextNote
      );
    }

    // shots
    for (let i = this.shots.length - 1; i >= 0; i--) {
      this.shots[i].move(playerPane.width / 100, playerPane.height / 10);
      drawNote(
        this.ctx,
        this.shots[i].x,
        this.shots[i].y,
        'PLAYER',
        this.shots[i].id
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
