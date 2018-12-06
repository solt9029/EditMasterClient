import { connect } from 'react-redux';
import { setYtPlayer, setCurrentTime } from '../actions/youtube';
import { resetPlay } from '../actions/others';
import { setIsSliderChanging } from '../actions/slider';
import YouTube from '../components/YouTube';

export default connect(
  state => ({
    videoId: state.score.videoId.value,
    isSliderChanging: state.slider.isChanging,
    ytPlayer: state.youtube.ytPlayer,
  }),
  { setYtPlayer, resetPlay, setCurrentTime, setIsSliderChanging }
)(YouTube);
