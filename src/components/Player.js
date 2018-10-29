import React, { Component } from 'react';
import { numbers, ids, seconds, positions, percentages } from '../constants';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Shot from '../classes/Shot';
import Canvas from '../classes/Canvas';
import JudgeEffect from '../classes/JudgeEffect';
import Sound from '../classes/Sound';
import * as utils from '../utils';

const sliderInlineStyle = {
  width: '95%',
  position: 'absolute',
  bottom: '5px',
  left: '0',
  right: '0',
  margin: 'auto',
};

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

  calcNoteIndexRangeInSecondRange(secondRange) {
    const offset = this.props.config.offset.value;
    const initialNoteIndex = Math.ceil(
      (this.props.currentTime - secondRange - offset) /
        utils.calculations.secondsPerNote(this.props.config.bpm.value)
    );
    const finalNoteIndex = Math.floor(
      (this.props.currentTime + secondRange - offset) /
        utils.calculations.secondsPerNote(this.props.config.bpm.value)
    );
    return [initialNoteIndex, finalNoteIndex];
  }

  calcNoteIndexRangeInCanvas(initialNoteX) {
    const spaceWidth =
      this.props.config.speed.value * percentages.PLAYER.SPEED_TO_SPACE_WIDTH;

    // Math.floor(-initialNoteX / spaceWidth) is the number of notes that already passed from canvas
    let initialNoteIndex = Math.floor(-initialNoteX / spaceWidth) - 3;

    // the number of notes that canvas can display in it
    const notesNumber = Math.ceil(
      (this.props.playerPane.width - 1) / spaceWidth
    );

    let finalNoteIndex = initialNoteIndex + notesNumber + 6;

    if (initialNoteIndex < 0) {
      initialNoteIndex = 0;
    }
    if (initialNoteIndex >= this.props.notes.length) {
      return null;
    }

    if (finalNoteIndex < 0) {
      return null;
    }
    if (finalNoteIndex >= this.props.notes.length) {
      finalNoteIndex = this.props.notes.length - 1;
    }

    return [initialNoteIndex, finalNoteIndex];
  }

  calcInitialNoteX() {
    const spaceWidth =
      this.props.config.speed.value * percentages.PLAYER.SPEED_TO_SPACE_WIDTH;

    const offset = this.props.config.offset.value;
    const initialNoteX =
      positions.PLAYER.JUDGE.X +
      ((offset - this.props.currentTime) /
        utils.calculations.secondsPerNote(this.props.config.bpm.value)) *
        spaceWidth;
    return initialNoteX;
  }

  autoMode() {
    if (
      !this.props.isAutoMode ||
      this.props.ytPlayerState !== ids.YOUTUBE.PLAYING
    ) {
      return;
    }

    const autoRange = this.calcNoteIndexRangeInSecondRange(seconds.RANGE.AUTO);

    for (let i = autoRange[0]; i <= autoRange[1]; i++) {
      if (i < 0 || i >= this.props.notes.length) {
        continue;
      }

      const note = this.props.notes[i];
      const noteState = this.props.states[i];
      if (noteState !== ids.STATE.FRESH || note === ids.NOTE.SPACE) {
        continue;
      }

      this.shots.push(new Shot((this.props.playerPane.height - 1) / 2, note));
      this.judgeEffects.push(
        new JudgeEffect((this.props.playerPane.height - 1) / 2, ids.STATE.GOOD)
      );

      if (utils.notes.hasState(note)) {
        this.props.setState(i, ids.STATE.GOOD);
      }

      if (utils.notes.isDon(note)) {
        this.sound.trigger('don');
      } else {
        this.sound.trigger('ka');
      }

      break;
    }
  }

  playMode(event) {
    if (
      this.props.isAutoMode ||
      this.props.ytPlayerState !== ids.YOUTUBE.PLAYING
    ) {
      return;
    }

    if (utils.keys.isDon(event.nativeEvent.key)) {
      this.sound.trigger('don');
    }
    if (utils.keys.isKa(event.nativeEvent.key)) {
      this.sound.trigger('ka');
    }

    const badRange = this.calcNoteIndexRangeInSecondRange(seconds.RANGE.BAD);
    const okRange = this.calcNoteIndexRangeInSecondRange(seconds.RANGE.OK);
    const goodRange = this.calcNoteIndexRangeInSecondRange(seconds.RANGE.GOOD);

    for (let i = badRange[0]; i <= badRange[1]; i++) {
      if (i < 0 || i >= this.props.notes.length) {
        continue;
      }

      const note = this.props.notes[i];
      const noteState = this.props.states[i];
      if (noteState !== ids.STATE.FRESH || note === ids.NOTE.SPACE) {
        continue;
      }

      let hit = false;
      if (utils.keys.isDon(event.nativeEvent.key) && utils.notes.isDon(note)) {
        hit = true;
      }
      if (utils.keys.isKa(event.nativeEvent.key) && utils.notes.isKa(note)) {
        hit = true;
      }
      if (!hit) {
        continue;
      }

      this.shots.push(new Shot((this.props.playerPane.height - 1) / 2, note));

      if (utils.notes.hasState(note)) {
        let stateId = ids.STATE.BAD;
        if (i >= goodRange[0] && i <= goodRange[1]) {
          stateId = ids.STATE.GOOD;
        } else if (i >= okRange[0] && i <= okRange[1]) {
          stateId = ids.STATE.OK;
        }
        this.props.setState(i, stateId);
        this.judgeEffects.push(
          new JudgeEffect((this.props.playerPane.height - 1) / 2, stateId)
        );
      }
      break;
    }
  }

  updateCanvas() {
    const spaceWidth =
      this.props.config.speed.value * percentages.PLAYER.SPEED_TO_SPACE_WIDTH;

    this.canvas.clear(
      this.props.playerPane.width - 1,
      this.props.playerPane.height - 1
    );

    this.canvas.drawJudgeMark((this.props.playerPane.height - 1) / 2);

    const initialNoteX = this.calcInitialNoteX(); // x position of initial note
    const canvasRange = this.calcNoteIndexRangeInCanvas(initialNoteX);
    if (!canvasRange) {
      return;
    }

    // judgeEffects
    for (let i = this.judgeEffects.length - 1; i >= 0; i--) {
      this.judgeEffects[i].move(this.props.playerPane.height / 50);
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
      this.canvas.drawBarStartLine(x, this.props.playerPane.height - 1);
    }

    // notes
    for (let i = canvasRange[1]; i >= canvasRange[0]; i--) {
      const note = this.props.notes[i];
      const noteState = this.props.states[i];
      const x = initialNoteX + i * spaceWidth;

      if (noteState !== ids.STATE.FRESH || note === ids.NOTE.SPACE) {
        continue;
      }

      const y = (this.props.playerPane.height - 1) / 2;
      const previousNote = i > 0 ? this.props.notes[i - 1] : ids.NOTE.SPACE;
      const nextNote =
        i < this.props.notes.length - 1
          ? this.props.notes[i + 1]
          : ids.NOTE.SPACE;

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
      this.shots[i].move(
        this.props.playerPane.width / 100,
        this.props.playerPane.height / 10
      );
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
    return (
      <div>
        <canvas
          tabIndex={0}
          onKeyDown={this.playMode}
          ref={this.canvasRef}
          style={{ display: 'block' }}
          width={this.props.playerPane.width - 1}
          height={this.props.playerPane.height - 1}
        />
        <Slider
          style={sliderInlineStyle}
          min={0}
          max={this.props.ytPlayer ? this.props.ytPlayer.getDuration() : 0}
          value={this.props.currentTime}
          onChange={value => {
            this.props.setChangingSlider(true);
            this.props.setCurrentTime(value);
          }}
          onAfterChange={() => {
            if (this.props.ytPlayer) {
              this.props.ytPlayer.seekTo(this.props.currentTime);
            }
            this.props.setChangingSlider(false);
          }}
        />
      </div>
    );
  }
}
