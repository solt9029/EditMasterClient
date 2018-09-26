import React, { Component } from 'react';
import Navbar from '../../parts/Navbar';
import IDE from '../../parts/IDE';
import axios from 'axios';
import config from '../../../config';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setConfig } from '../../../actions/config';
import { change } from 'redux-form';
import { calcSecondsPerNote } from '../../../actions/player';
import NotFound from '../NotFound';

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
      const { bpm, username, offset, comment, speed } = score;
      const videoId = score.video_id;

      if (this.props.configForm) {
        this.props.change('username', username);
        this.props.change('videoId', videoId);
        this.props.change('offset', offset);
        this.props.change('comment', comment);
        this.props.change('speed', speed);
        this.props.change('bpm', bpm);
        this.props.calcSecondsPerNote(bpm);
      } else {
        this.props.setConfigInitialValues({
          bpm,
          username,
          offset,
          comment,
          speed,
          videoId,
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
        <Navbar active="scoresNew" />
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
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Show)
);
