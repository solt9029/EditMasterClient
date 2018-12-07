import { connect } from 'react-redux';
import PlayerSlider from '../components/PlayerSlider';
import { setCurrentTime } from '../actions/youtube';
import { setIsSliderChanging } from '../actions/slider';

export default connect(
  state => ({
    currentTime: state.youtube.currentTime,
    ytPlayer: state.youtube.ytPlayer,
  }),
  { setCurrentTime, setIsSliderChanging }
)(PlayerSlider);
