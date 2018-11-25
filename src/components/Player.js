import React, { Component } from 'react';
import { numbers, ids, seconds, percentages } from '../constants';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Shot from '../classes/Shot';
import Canvas from '../classes/Canvas';
import JudgeEffect from '../classes/JudgeEffect';
import Sound from '../classes/Sound';
import * as utils from '../utils';
import styled from 'styled-components';

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
  constructor(props) {
    super(props);
    this.shots = [];
    this.judgeEffects = [];
    this.canvasRef = React.createRef();
    this.canvas = null;
    this.sound = new Sound();
    this.playMode = this.playMode.bind(this);
  }

  componentDidMount() {
    const ctx = this.canvasRef.current.getContext('2d');
    this.canvas = new Canvas(ctx);
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

    const autoRange = utils.calculations.calcNoteIndexRangeInSecondRange(
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

      if (utils.note.hasState(note)) {
        setState(i, ids.STATE.GOOD);
      }

      if (utils.note.isDon(note)) {
        this.sound.trigger('don');
      } else {
        this.sound.trigger('ka');
      }

      break;
    }
  }

  playMode(event) {
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

    if (utils.key.isDon(key)) {
      this.sound.trigger('don');
    }
    if (utils.key.isKa(key)) {
      this.sound.trigger('ka');
    }

    const badRange = utils.calculations.calcNoteIndexRangeInSecondRange(
      seconds.RANGE.BAD,
      currentTime,
      config.bpm.value,
      config.offset.value
    );
    const okRange = utils.calculations.calcNoteIndexRangeInSecondRange(
      seconds.RANGE.OK,
      currentTime,
      config.bpm.value,
      config.offset.value
    );
    const goodRange = utils.calculations.calcNoteIndexRangeInSecondRange(
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
      if (utils.key.isDon(key) && utils.note.isDon(note)) {
        hit = true;
      }
      if (utils.key.isKa(key) && utils.note.isKa(note)) {
        hit = true;
      }
      if (!hit) {
        continue;
      }

      this.shots.push(new Shot((playerPane.height - 1) / 2, note));

      if (utils.note.hasState(note)) {
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
  }

  updateCanvas() {
    const { config, playerPane, currentTime, notes, states } = this.props;

    const spaceWidth =
      config.speed.value * percentages.PLAYER.SPEED_TO_SPACE_WIDTH;

    this.canvas.clear(playerPane.width - 1, playerPane.height - 1);
    this.canvas.drawJudgeMark((playerPane.height - 1) / 2);

    const initialNoteX = utils.calculations.calcInitialNoteX(
      currentTime,
      config.bpm.value,
      config.offset.value,
      config.speed.value
    );
    const canvasRange = utils.calculations.calcNoteIndexRangeInCanvas(
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
      this.canvas.drawJudgeEffect(
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
      this.canvas.drawBarStartLine(x, playerPane.height - 1);
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

      this.canvas.drawNote(
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
      this.canvas.drawNote(
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
        <canvas
          tabIndex={0}
          onKeyDown={this.playMode}
          ref={this.canvasRef}
          style={{ display: 'block' }}
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
