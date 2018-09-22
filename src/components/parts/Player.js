import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import { connect } from 'react-redux';
import NoteCircle from './NoteCircle';
import JudgeCircle from './JudgeCircle';
import NoteExtension from './NoteExtension';
import {
  size,
  id,
  position,
  number,
  sound,
  second,
  color,
} from '../../constants';
import NoteEnd from './NoteEnd';
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

  updateCanvas() {
    if (!this.props.config) {
      return;
    }
    if (!this.props.config.values.bpm) {
      return;
    }

    this.canvas.clear(
      this.props.player.width - 1,
      this.props.player.height - 1
    );

    const secondsPerNote = this.calcSecondsPerNote();
    const initialNoteX = this.calcInitialNoteX(secondsPerNote); // x position of initial note
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
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  calcSecondsPerNote() {
    const barPerMinute = this.props.config.values.bpm / number.beat;
    const barPerSecond = barPerMinute / 60;
    const notesPerSecond = barPerSecond * number.score.column;
    const secondsPerNote = 1 / notesPerSecond;
    return secondsPerNote;
  }

  calcNoteIndexesInRangeSecond(secondsPerNote, rangeSecond) {
    const initialNoteIndex = Math.ceil(
      (this.props.currentTime - rangeSecond - this.props.config.values.offset) /
        secondsPerNote
    );
    const finalNoteIndex = Math.floor(
      (this.props.currentTime + rangeSecond - this.props.config.values.offset) /
        secondsPerNote
    );
    let indexes = [];
    for (let i = initialNoteIndex; i <= finalNoteIndex; i++) {
      indexes.push(i);
    }
    return indexes;
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

  calcInitialNoteX(secondsPerNote) {
    const initialNoteX =
      position.player.judge.x +
      ((this.props.config.values.offset - this.props.currentTime) /
        secondsPerNote) *
        size.player.space.width;
    return initialNoteX;
  }

  autoMode(secondsPerNote) {
    const noteIndexesInGoodJudgeRange = this.calcNoteIndexesInRangeSecond(
      secondsPerNote,
      second.range.good
    );

    for (let i = 0; i < noteIndexesInGoodJudgeRange.length; i++) {
      const index = noteIndexesInGoodJudgeRange[i];
      if (index < 0 || index >= this.props.notes.length) {
        continue;
      }

      const note = this.props.notes[index];
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
        this.props.setState(index, id.state.good);
      }

      if (note.id === id.note.ka || note.id === id.note.bigka) {
        sound.ka.trigger();
      } else {
        sound.don.trigger();
      }

      break;
    }
  }

  renderShots() {
    let shots = [];
    for (let i = this.shots.length - 1; i >= 0; i--) {
      this.shots[i].move(
        this.props.player.width / 100,
        this.props.player.height / 10
      );
      shots.push(
        <NoteCircle
          pane="player"
          x={this.shots[i].x}
          y={this.shots[i].y}
          id={this.shots[i].id}
        />
      );
      if (this.shots[i].limit < 0) {
        this.shots.splice(i, 1);
      }
    }
    return shots;
  }

  renderNotes() {
    if (!this.props.config) {
      return;
    }
    if (!this.props.config.values.bpm) {
      return;
    }

    const secondsPerNote = this.calcSecondsPerNote();
    const initialNoteX = this.calcInitialNoteX(secondsPerNote); // x position of initial note
    const noteIndexesInCanvas = this.calcNoteIndexesInCanvas(initialNoteX);
    const slicedNotes = this.props.notes.slice(
      noteIndexesInCanvas[0],
      noteIndexesInCanvas[noteIndexesInCanvas.length - 1]
    );
    const reversedSlicedNotes = slicedNotes.reverse();

    // sample code sound (not good)
    if (this.props.isAutoMode) {
      this.autoMode(secondsPerNote);
    }

    return reversedSlicedNotes.map((note, reversedIndex) => {
      if (note.state !== id.state.fresh || note.id === id.note.space) {
        return null;
      }

      const index = reversedSlicedNotes.length - 1 - reversedIndex;
      const x =
        initialNoteX +
        (noteIndexesInCanvas[0] + index) * size.player.space.width;
      const y = (this.props.player.height - 1) / 2;
      const previousNoteId =
        index > 0 ? reversedSlicedNotes[reversedIndex + 1].id : id.note.space;
      const nextNoteId =
        index < reversedSlicedNotes.length - 1
          ? reversedSlicedNotes[reversedIndex - 1].id
          : id.note.space;
      const isBarStart =
        (noteIndexesInCanvas[0] + index) % number.score.column === 0;

      if (
        note.id === id.note.renda ||
        note.id === id.note.bigrenda ||
        note.id === id.note.balloon
      ) {
        if (previousNoteId === note.id) {
          if (nextNoteId === note.id) {
            return (
              <NoteExtension
                spaceWidth={size.player.space.width}
                pane="player"
                barStart={isBarStart}
                x={x}
                y={y}
                id={note.id}
              />
            );
          }
          return (
            <NoteEnd
              pane="player"
              barStart={isBarStart}
              x={x}
              y={y}
              id={note.id}
            />
          );
        }
      }
      return (
        <NoteCircle
          pane="player"
          barStart={isBarStart}
          x={x}
          y={y}
          id={note.id}
        />
      );
    });
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
