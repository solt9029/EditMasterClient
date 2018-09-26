import React, { Component } from 'react';
import { connect } from 'react-redux';
import constants from '../../constants';
import { setState } from '../../actions/player';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { setCurrentTime, setChangingSlider } from '../../actions/player';
import Shot from '../../Shot';
import Canvas from '../../Canvas';
import JudgeEffect from '../../JudgeEffect';

const sliderInlineStyle = {
  width: '95%',
  position: 'absolute',
  bottom: '5px',
  left: '0',
  right: '0',
  margin: 'auto',
};

class Player extends Component {
  constructor(props) {
    super(props);
    this.shots = [];
    this.judgeEffects = [];
    this.canvasRef = React.createRef();
    this.canvas = null;
    this.playMode = this.playMode.bind(this);
  }

  componentDidMount() {
    const ctx = this.canvasRef.current.getContext('2d');
    this.canvas = new Canvas(ctx);
    this.updateCanvas();
    window.addEventListener('keydown', this.playMode);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.playMode);
  }

  componentDidUpdate() {
    this.updateCanvas();
    this.autoMode();
  }

  calcNoteIndexRangeInSecondRange(secondRange) {
    const offset = this.props.configForm
      ? this.props.configForm.values.offset
      : this.props.configInitialValues.offset;
    const initialNoteIndex = Math.ceil(
      (this.props.currentTime - secondRange - offset) /
        this.props.secondsPerNote
    );
    const finalNoteIndex = Math.floor(
      (this.props.currentTime + secondRange - offset) /
        this.props.secondsPerNote
    );
    return [initialNoteIndex, finalNoteIndex];
  }

  calcNoteIndexRangeInCanvas(initialNoteX) {
    const spaceWidth = this.props.configForm
      ? this.props.configForm.values.speed *
        constants.percentage.player.speedToSpaceWidth
      : this.props.configInitialValues.speed *
        constants.percentage.player.speedToSpaceWidth;

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
    if (initialNoteIndex >= this.props.noteIds.length) {
      return null;
    }

    if (finalNoteIndex < 0) {
      return null;
    }
    if (finalNoteIndex >= this.props.noteIds.length) {
      finalNoteIndex = this.props.noteIds.length - 1;
    }

    return [initialNoteIndex, finalNoteIndex];
  }

  calcInitialNoteX() {
    const spaceWidth = this.props.configForm
      ? this.props.configForm.values.speed *
        constants.percentage.player.speedToSpaceWidth
      : this.props.configInitialValues.speed *
        constants.percentage.player.speedToSpaceWidth;

    const offset = this.props.configForm
      ? this.props.configForm.values.offset
      : this.props.configInitialValues.offset;
    const initialNoteX =
      constants.position.player.judge.x +
      ((offset - this.props.currentTime) / this.props.secondsPerNote) *
        spaceWidth;
    return initialNoteX;
  }

  autoMode() {
    if (
      !this.props.isAutoMode ||
      this.props.ytPlayerState !== constants.id.youtube.playing
    ) {
      return;
    }

    const autoRange = this.calcNoteIndexRangeInSecondRange(
      constants.second.range.auto
    );

    for (let i = autoRange[0]; i <= autoRange[1]; i++) {
      if (i < 0 || i >= this.props.noteIds.length) {
        continue;
      }

      const noteId = this.props.noteIds[i];
      const noteState = this.props.noteStates[i];
      if (
        noteState !== constants.id.state.fresh ||
        noteId === constants.id.note.space
      ) {
        continue;
      }

      this.shots.push(new Shot((this.props.playerPane.height - 1) / 2, noteId));
      this.judgeEffects.push(
        new JudgeEffect(
          (this.props.playerPane.height - 1) / 2,
          constants.id.state.good
        )
      );

      if (constants.id.note.hasState(noteId)) {
        this.props.setState(i, constants.id.state.good);
      }

      if (constants.id.note.isDon(noteId)) {
        constants.sound.don.trigger();
      } else {
        constants.sound.ka.trigger();
      }

      break;
    }
  }

  playMode(event) {
    if (
      this.props.isAutoMode ||
      this.props.ytPlayerState !== constants.id.youtube.playing
    ) {
      return;
    }

    if (constants.key.isDon(event.key)) {
      constants.sound.don.trigger();
    }
    if (constants.key.isKa(event.key)) {
      constants.sound.ka.trigger();
    }

    const badRange = this.calcNoteIndexRangeInSecondRange(
      constants.second.range.bad
    );
    const okRange = this.calcNoteIndexRangeInSecondRange(
      constants.second.range.ok
    );
    const goodRange = this.calcNoteIndexRangeInSecondRange(
      constants.second.range.good
    );

    for (let i = badRange[0]; i <= badRange[1]; i++) {
      if (i < 0 || i >= this.props.noteIds.length) {
        continue;
      }

      const noteId = this.props.noteIds[i];
      const noteState = this.props.noteStates[i];
      if (
        noteState !== constants.id.state.fresh ||
        noteId === constants.id.note.space
      ) {
        continue;
      }

      let hit = false;
      if (constants.key.isDon(event.key) && constants.id.note.isDon(noteId)) {
        hit = true;
      }
      if (constants.key.isKa(event.key) && constants.id.note.isKa(noteId)) {
        hit = true;
      }
      if (!hit) {
        continue;
      }

      this.shots.push(new Shot((this.props.playerPane.height - 1) / 2, noteId));

      if (constants.id.note.hasState(noteId)) {
        let stateId = constants.id.state.bad;
        if (i >= goodRange[0] && i <= goodRange[1]) {
          stateId = constants.id.state.good;
        } else if (i >= okRange[0] && i <= okRange[1]) {
          stateId = constants.id.state.ok;
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
    const spaceWidth = this.props.configForm
      ? this.props.configForm.values.speed *
        constants.percentage.player.speedToSpaceWidth
      : this.props.configInitialValues.speed *
        constants.percentage.player.speedToSpaceWidth;

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
      canvasRange[0] - (canvasRange[0] % constants.number.notesPerBar);
    for (
      let i = initialBarStartLineIndex;
      i <= canvasRange[1];
      i += constants.number.notesPerBar
    ) {
      const x = initialNoteX + i * spaceWidth;
      this.canvas.drawBarStartLine(x, this.props.playerPane.height - 1);
    }

    // notes
    for (let i = canvasRange[1]; i >= canvasRange[0]; i--) {
      const noteId = this.props.noteIds[i];
      const noteState = this.props.noteStates[i];
      const x = initialNoteX + i * spaceWidth;

      if (
        noteState !== constants.id.state.fresh ||
        noteId === constants.id.note.space
      ) {
        continue;
      }

      const y = (this.props.playerPane.height - 1) / 2;
      const previousNoteId =
        i > 0 ? this.props.noteIds[i - 1] : constants.id.note.space;
      const nextNoteId =
        i < this.props.noteIds.length - 1
          ? this.props.noteIds[i + 1]
          : constants.id.note.space;

      this.canvas.drawNote(
        x,
        y,
        'player',
        noteId,
        spaceWidth,
        previousNoteId,
        nextNoteId
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
        'player',
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
          ref={this.canvasRef}
          style={{ display: 'block' }}
          width={this.props.playerPane.width - 1}
          height={this.props.playerPane.height - 1}
          onClick={() => {
            if (this.props.ytPlayerState === constants.id.youtube.playing) {
              this.props.ytPlayer.pauseVideo();
            } else if (
              this.props.ytPlayerState === constants.id.youtube.paused
            ) {
              this.props.ytPlayer.playVideo();
            }
          }}
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

const mapStateToProps = state => ({
  playerPane: state.pane.player,
  noteIds: state.editor.noteIds,
  noteStates: state.player.noteStates,
  currentTime: state.player.currentTime,
  configForm: state.form.config,
  configInitialValues: state.config,
  isAutoMode: state.player.isAutoMode,
  ytPlayer: state.player.ytPlayer,
  isChangingSlider: state.player.isChangingSlider,
  secondsPerNote: state.player.secondsPerNote,
  ytPlayerState: state.player.ytPlayerState,
});
const mapDispatchToProps = dispatch => ({
  setState(index, state) {
    dispatch(setState(index, state));
  },
  setCurrentTime(currentTime) {
    dispatch(setCurrentTime(currentTime));
  },
  setChangingSlider(isChangingSlider) {
    dispatch(setChangingSlider(isChangingSlider));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
