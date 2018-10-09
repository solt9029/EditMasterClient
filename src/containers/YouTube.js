import { connect } from 'react-redux';
import {
  setYtPlayer,
  setCurrentTime,
  setYtPlayerState,
  reset,
} from '../actions/youtube';
import { setChangingSlider, freshStates } from '../actions/player';
import YouTube from '../components/YouTube';

const mapStateToProps = state => ({
  config: state.config,
  isChangingSlider: state.player.isChangingSlider,
  ytPlayer: state.youtube.ytPlayer,
});
const mapDispatchToProps = dispatch => ({
  setYtPlayer(ytPlayer) {
    dispatch(setYtPlayer(ytPlayer));
  },
  freshStates() {
    dispatch(freshStates());
  },
  setCurrentTime(currentTime) {
    dispatch(setCurrentTime(currentTime));
  },
  setChangingSlider(isChangingSlider) {
    dispatch(setChangingSlider(isChangingSlider));
  },
  setYtPlayerState(ytPlayerState) {
    dispatch(setYtPlayerState(ytPlayerState));
  },
  reset() {
    dispatch(reset());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YouTube);
