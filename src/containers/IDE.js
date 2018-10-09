import { connect } from 'react-redux';
import { setPanes } from '../actions/ide';
import { setCurrentTime } from '../actions/youtube';
import IDE from '../components/IDE';

const mapStateToProps = state => ({
  ytPlayer: state.youtube.ytPlayer,
  isChangingSlider: state.player.isChangingSlider,
});
const mapDispatchToProps = dispatch => ({
  setPanes(references) {
    dispatch(setPanes(references));
  },
  setCurrentTime(currentTime) {
    dispatch(setCurrentTime(currentTime));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IDE);
