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
import { replaceNotes } from '../../../actions/editor';
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
      const result = await axios.get(
        `http://${config.api.host}:${config.api.port}/scores/${
          this.props.match.params.id
        }`
      );
      const score = result.data;

      const notes = JSON.parse(score.notes);
      this.props.replaceNotes(notes);
      let states = Array(notes.length);
      states.fill(constants.id.note.space);
      this.props.replaceStates(states);

      this.props.setConfig({
        username: score.username,
        videoId: score.video_id,
        offset: score.offset,
        comment: score.comment,
        speed: score.speed,
        bpm: score.bpm,
      });
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
  setConfig(config) {
    dispatch(setConfig(config));
  },
  change(field, value) {
    dispatch(change('config', field, value));
  },
  calcSecondsPerNote(bpm) {
    dispatch(calcSecondsPerNote(bpm));
  },
  replaceNotes(notes) {
    dispatch(replaceNotes(notes));
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
