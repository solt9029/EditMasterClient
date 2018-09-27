import React, { Component } from 'react';
import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';
import IDE from '../../parts/IDE';
import { defaultState as editorDefaultState } from '../../../reducers/editor';
import { defaultState as configDefaultState } from '../../../reducers/config';
import { connect } from 'react-redux';
import { setConfig } from '../../../actions/config';
import { change } from 'redux-form';
import { calcSecondsPerNote, replaceStates } from '../../../actions/player';
import { replaceNoteIds } from '../../../actions/editor';
import constants from '../../../constants';

class New extends Component {
  componentDidMount() {
    this.props.replaceNoteIds(editorDefaultState.noteIds);
    let states = Array(editorDefaultState.noteIds.length);
    states.fill(constants.id.note.space);
    this.props.replaceStates(states);

    // need check of configForm???
    this.props.change('username', configDefaultState.username);
    this.props.change('videoId', configDefaultState.videoId);
    this.props.change('offset', configDefaultState.offset);
    this.props.change('comment', configDefaultState.comment);
    this.props.change('speed', configDefaultState.speed);
    this.props.change('bpm', configDefaultState.bpm);
    this.props.calcSecondsPerNote(configDefaultState.bpm);
  }
  render() {
    return (
      <div>
        <Navbar />
        <IDE />
        <Footer />
      </div>
    );
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(New);
