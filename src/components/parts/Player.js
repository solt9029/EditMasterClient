import React, { Component } from 'react';
import { connect } from 'react-redux';
import { size, id, position, sound, second } from '../../constants';
import { setState } from '../../actions/editor';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { setCurrentTime, setChangingSlider } from '../../actions/player';
import Shot from '../../Shot';
import Canvas from '../../Canvas';

const divInlineStyle = {
  outline: 'none',
};

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
    this.canvasRef = React.createRef();
    this.canvas = null;
  }

  componentDidMount() {
    const ctx = this.canvasRef.current.getContext('2d');
    this.canvas = new Canvas(ctx);
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
    if (
      this.props.isAutoMode &&
      this.props.ytPlayerState === id.youtube.playing
    ) {
      this.autoMode();
    }
  }

  calcNoteIndexRangeInSecondRange(secondRange) {
    const initialNoteIndex = Math.ceil(
      (this.props.currentTime - secondRange - this.props.config.values.offset) /
        this.props.secondsPerNote
    );
    const finalNoteIndex = Math.floor(
      (this.props.currentTime + secondRange - this.props.config.values.offset) /
        this.props.secondsPerNote
    );
    return [initialNoteIndex, finalNoteIndex];
  }

  calcNoteIndexRangeInCanvas(initialNoteX) {
    // Math.floor(-initialNoteX / size.player.space.width) is the number of notes that already passed from canvas
    let initialNoteIndex =
      Math.floor(-initialNoteX / size.player.space.width) - 3;

    // the number of notes that canvas can display in it
    const notesNumber = Math.ceil(
      (this.props.player.width - 1) / size.player.space.width
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
    const initialNoteX =
      position.player.judge.x +
      ((this.props.config.values.offset - this.props.currentTime) /
        this.props.secondsPerNote) *
        size.player.space.width;
    return initialNoteX;
  }

  autoMode() {
    const noteIndexRangeInGoodJudgeRange = this.calcNoteIndexRangeInSecondRange(
      second.range.auto
    );

    for (
      let i = noteIndexRangeInGoodJudgeRange[0];
      i <= noteIndexRangeInGoodJudgeRange[1];
      i++
    ) {
      if (i < 0 || i >= this.props.notes.length) {
        continue;
      }

      const note = this.props.notes[i];
      if (note.state !== id.state.fresh || note.id === id.note.space) {
        continue;
      }

      this.shots.push(
        new Shot(
          position.player.judge.x,
          (this.props.player.height - 1) / 2,
          note.id
        )
      );

      if (
        note.id === id.note.don ||
        note.id === id.note.ka ||
        note.id === id.note.bigdon ||
        note.id === id.note.bigka
      ) {
        this.props.setState(i, id.state.good);
      }

      if (note.id === id.note.ka || note.id === id.note.bigka) {
        sound.ka.trigger();
      } else {
        sound.don.trigger();
      }

      break;
    }
  }

  updateCanvas() {
    if (!this.props.config) {
      return;
    }
    // if (!this.props.secondsPerNote) {
    //   return;
    // }

    this.canvas.clear(
      this.props.player.width - 1,
      this.props.player.height - 1
    );

    this.canvas.drawJudgeMark((this.props.player.height - 1) / 2);

    const initialNoteX = this.calcInitialNoteX(); // x position of initial note
    const noteIndexRangeInCanvas = this.calcNoteIndexRangeInCanvas(
      initialNoteX
    );
    if (!noteIndexRangeInCanvas) {
      return;
    }

    for (
      let i = noteIndexRangeInCanvas[1];
      i >= noteIndexRangeInCanvas[0];
      i--
    ) {
      const note = this.props.notes[i];

      if (note.state !== id.state.fresh || note.id === id.note.space) {
        continue;
      }
      const x = initialNoteX + i * size.player.space.width;
      const y = (this.props.player.height - 1) / 2;
      const previousNoteId = i > 0 ? this.props.notes[i - 1].id : id.note.space;
      const nextNoteId =
        i < this.props.notes.length - 1
          ? this.props.notes[i + 1].id
          : id.note.space;

      this.canvas.drawNote(x, y, 'player', note.id, previousNoteId, nextNoteId);
    }

    for (let i = this.shots.length - 1; i >= 0; i--) {
      this.shots[i].move(
        this.props.player.width / 100,
        this.props.player.height / 10
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
      <div
        style={divInlineStyle}
        tabIndex="0"
        onKeyDown={e => console.log(e.key)}
      >
        <canvas
          ref={this.canvasRef}
          style={{ display: 'block' }}
          width={this.props.player.width - 1}
          height={this.props.player.height - 1}
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
  player: state.pane.player,
  notes: state.editor.notes,
  currentTime: state.player.currentTime,
  config: state.form.config,
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
