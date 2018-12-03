import { connect } from 'react-redux';
import {
  setYtPlayer,
  setCurrentTime,
  setYtPlayerState,
  reset,
} from '../actions/youtube';
import { freshStates } from '../actions/player';
import { setIsSliderChanging } from '../actions/slider';
import YouTube from '../components/YouTube';

const mapStateToProps = state => ({
  // config: state.config,
  videoId: state.config.videoId.value,
  isSliderChanging: state.slider.isChanging,
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
    dispatch(setIsSliderChanging(isSliderChanging));
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
