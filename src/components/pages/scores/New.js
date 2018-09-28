import React, { Component } from 'react';
import Navbar from '../../parts/Navbar';
import Footer from '../../parts/Footer';
import IDE from '../../parts/IDE';
import { defaultState as editorDefaultState } from '../../../reducers/editor';
import { defaultConfig } from '../../../reducers/config';
import { connect } from 'react-redux';
import { setConfig } from '../../../actions/config';
import { replaceStates } from '../../../actions/player';
import { replaceNoteIds } from '../../../actions/editor';
import constants from '../../../constants';

class New extends Component {
  componentDidMount() {
    this.props.replaceNoteIds(editorDefaultState.noteIds);
    let states = Array(editorDefaultState.noteIds.length);
    states.fill(constants.id.note.space);
    this.props.replaceStates(states);

    this.props.setConfig(defaultConfig);
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
  replaceNoteIds(noteIds) {
    dispatch(replaceNoteIds(noteIds));
  },
  replaceStates(states) {
    dispatch(replaceStates(states));
  },
  setConfig(config) {
    dispatch(setConfig(config));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(New);
