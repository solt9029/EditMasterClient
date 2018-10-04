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
import { resetStates } from '../../actions/player';

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
  }

  componentWillUnmount() {
    this.props.resetStates();
  }

  componentDidUpdate() {
    this.updateCanvas();
    this.autoMode();
  }

  calcNoteIndexRangeInSecondRange(secondRange) {
    const offset = this.props.config.offset.value;
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
    const spaceWidth =
      this.props.config.speed.value *
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
      this.props.config.speed.value *
      constants.percentage.player.speedToSpaceWidth;

    const offset = this.props.config.offset.value;
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
      if (i < 0 || i >= this.props.notes.length) {
        continue;
      }

      const note = this.props.notes[i];
      const noteState = this.props.states[i];
      if (
        noteState !== constants.id.state.fresh ||
        note === constants.id.note.space
      ) {
        continue;
      }

      this.shots.push(new Shot((this.props.playerPane.height - 1) / 2, note));
      this.judgeEffects.push(
        new JudgeEffect(
          (this.props.playerPane.height - 1) / 2,
          constants.id.state.good
        )
      );

      if (constants.id.note.hasState(note)) {
        this.props.setState(i, constants.id.state.good);
      }

      if (constants.id.note.isDon(note)) {
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

    if (constants.key.isDon(event.nativeEvent.key)) {
      constants.sound.don.trigger();
    }
    if (constants.key.isKa(event.nativeEvent.key)) {
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
      if (i < 0 || i >= this.props.notes.length) {
        continue;
      }

      const note = this.props.notes[i];
      const noteState = this.props.states[i];
      if (
        noteState !== constants.id.state.fresh ||
        note === constants.id.note.space
      ) {
        continue;
      }

      let hit = false;
      if (
        constants.key.isDon(event.nativeEvent.key) &&
        constants.id.note.isDon(note)
      ) {
        hit = true;
      }
      if (
        constants.key.isKa(event.nativeEvent.key) &&
        constants.id.note.isKa(note)
      ) {
        hit = true;
      }
      if (!hit) {
        continue;
      }

      this.shots.push(new Shot((this.props.playerPane.height - 1) / 2, note));

      if (constants.id.note.hasState(note)) {
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
    const spaceWidth =
      this.props.config.speed.value *
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
      const note = this.props.notes[i];
      const noteState = this.props.states[i];
      const x = initialNoteX + i * spaceWidth;

      if (
        noteState !== constants.id.state.fresh ||
        note === constants.id.note.space
      ) {
        continue;
      }

      const y = (this.props.playerPane.height - 1) / 2;
      const previousNote =
        i > 0 ? this.props.notes[i - 1] : constants.id.note.space;
      const nextNote =
        i < this.props.notes.length - 1
          ? this.props.notes[i + 1]
          : constants.id.note.space;

      this.canvas.drawNote(
        x,
        y,
        'player',
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

const mapStateToProps = state => ({
  playerPane: state.ide.player,
  notes: state.editor.notes,
  states: state.player.states,
  currentTime: state.player.currentTime,
  config: state.config,
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
  resetStates() {
    dispatch(resetStates());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
