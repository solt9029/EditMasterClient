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
  // config: state.config,
  videoId: state.config.videoId.value,
  isSliderChanging: state.player.isChangingSlider,
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
  setIsSliderChanging(isSliderChanging) {
    dispatch(setChangingSlider(isSliderChanging));
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
