import { connect } from 'react-redux';
import { setIsSliderChanging } from '../actions/slider';
import { setCurrentTime } from '../actions/youtube';
import { doPlayMode } from '../actions/others';
import Player from '../components/Player';

export default connect(
  state => ({
    currentTime: state.youtube.currentTime,
    ytPlayer: state.youtube.ytPlayer,
  }),
  { setCurrentTime, setIsSliderChanging, doPlayMode }
)(Player);
