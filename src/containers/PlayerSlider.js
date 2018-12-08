import { connect } from 'react-redux';
import PlayerSlider from '../components/PlayerSlider';
import { setCurrentTime } from '../actions/current-time';
import { setIsSliderChanging } from '../actions/slider';

export default connect(
  state => ({
    currentTime: state.currentTime,
    ytPlayer: state.ytPlayer,
  }),
  { setCurrentTime, setIsSliderChanging }
)(PlayerSlider);
