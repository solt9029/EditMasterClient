import { connect } from 'react-redux';
import {
  setUsername,
  setVideoId,
  fetchSongle,
  setBpm,
  setOffset,
  setSpeed,
  setComment,
} from '../actions/score';
import Config from '../components/Config';

export default connect(
  state => ({
    username: state.score.username,
    videoId: state.score.videoId,
    offset: state.score.offset,
    speed: state.score.speed,
    comment: state.score.comment,
    bpm: state.score.bpm,
  }),
  {
    setUsername,
    setVideoId,
    fetchSongle,
    setOffset,
    setSpeed,
    setComment,
    setBpm,
  }
)(Config);
