import { connect } from 'react-redux';
import { setYtPlayer, setCurrentTime } from '../actions/youtube';
import { resetPlay } from '../actions/others';
import { setIsSliderChanging } from '../actions/slider';
import YouTube from '../components/YouTube';

const mapStateToProps = state => ({
  videoId: state.score.videoId.value,
  isSliderChanging: state.slider.isChanging,
  ytPlayer: state.youtube.ytPlayer,
});
const mapDispatchToProps = dispatch => ({
  setYtPlayer(ytPlayer) {
    dispatch(setYtPlayer(ytPlayer));
  },
  resetPlay() {
    dispatch(resetPlay());
  },
  setCurrentTime(currentTime) {
    dispatch(setCurrentTime(currentTime));
  },
  setIsSliderChanging(isSliderChanging) {
    dispatch(setIsSliderChanging(isSliderChanging));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YouTube);
