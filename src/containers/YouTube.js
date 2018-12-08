import { connect } from 'react-redux';
import { setYtPlayer } from '../actions/yt-player';
import { setCurrentTime } from '../actions/current-time';
import { resetPlay } from '../actions/others';
import { setIsSliderChanging } from '../actions/slider';
import YouTube from '../components/YouTube';
import { doAutoMode } from '../actions/others';
import { updateEffects } from '../actions/effects';

export default connect(
  state => ({
    videoId: state.score.videoId.value,
    isSliderChanging: state.slider.isChanging,
    ytPlayer: state.ytPlayer,
  }),
  {
    setYtPlayer,
    resetPlay,
    setCurrentTime,
    setIsSliderChanging,
    updateEffects,
    doAutoMode,
  }
)(YouTube);
