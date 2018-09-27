import React, { Component } from 'react';
import Navbar from '../../parts/Navbar';
import IDE from '../../parts/IDE';
import axios from 'axios';
import config from '../../../config';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setConfig } from '../../../actions/config';
import { change } from 'redux-form';
import { calcSecondsPerNote, replaceStates } from '../../../actions/player';
import { replaceNoteIds } from '../../../actions/editor';
import NotFound from '../NotFound';
import constants from '../../../constants';

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
  }

  async componentDidMount() {
    try {
      // reset
      this.props.replaceNoteIds(
        Array(constants.number.notesPerBar).fill(constants.id.note.space)
      );
      this.props.replaceStates(
        Array(constants.number.notesPerBar).fill(constants.id.state.fresh)
      );

      const result = await axios.get(
        `http://${config.api.host}:${config.api.port}/scores/${
          this.props.match.params.id
        }`
      );
      const score = result.data;

      const noteIds = JSON.parse(score.note_ids);
      this.props.replaceNoteIds(noteIds);
      let states = Array(noteIds.length);
      states.fill(constants.id.note.space);
      this.props.replaceStates(states);

      if (this.props.configForm) {
        this.props.change('username', score.username);
        this.props.change('videoId', score.video_id);
        this.props.change('offset', score.offset);
        this.props.change('comment', score.comment);
        this.props.change('speed', score.speed);
        this.props.change('bpm', score.bpm);
        this.props.calcSecondsPerNote(score.bpm);
      } else {
        this.props.setConfigInitialValues({
          bpm: score.bpm,
          username: score.username,
          offset: score.offset,
          comment: score.comment,
          speed: score.speed,
          videoId: score.video_id,
        });
      }
    } catch (error) {
      let errors = this.state.errors.concat(error);
      this.setState({
        errors,
      });
    }
  }

  render() {
    let component = (
      <div>
        <Navbar />
        <IDE />
      </div>
    );
    if (this.state.errors.length > 0) {
      component = <NotFound />;
    }

    return component;
  }
}

const mapStateToProps = state => ({
  configForm: state.form.config,
});
const mapDispatchToProps = dispatch => ({
  setConfigInitialValues(config) {
    dispatch(setConfig(config));
  },
  change(field, value) {
    dispatch(change('config', field, value));
  },
  calcSecondsPerNote(bpm) {
    dispatch(calcSecondsPerNote(bpm));
  },
  replaceNoteIds(noteIds) {
    dispatch(replaceNoteIds(noteIds));
  },
  replaceStates(states) {
    dispatch(replaceStates(states));
  },
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Show)
);
