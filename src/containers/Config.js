import { connect } from 'react-redux';
import {
  setUsername,
  setVideoId,
  fetchSongle,
  setBpm,
  setOffset,
  setSpeed,
  setComment,
} from '../actions/config';
import Config from '../components/Config';

const mapStateToProps = state => ({
  config: state.config,
});
const mapDispatchToProps = dispatch => ({
  setUsername(value) {
    dispatch(setUsername(value));
  },
  setVideoId(value) {
    dispatch(setVideoId(value));
  },
  fetchSongle(videoId) {
    dispatch(fetchSongle(videoId));
  },
  setOffset(value) {
    dispatch(setOffset(value));
  },
  setSpeed(value) {
    dispatch(setSpeed(value));
  },
  setComment(value) {
    dispatch(setComment(value));
  },
  setBpm(value) {
    dispatch(setBpm(value));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Config);
