import { connect } from 'react-redux';
import PlayerJudgeMarkCanvas from '../components/PlayerJudgeMarkCanvas';

export default connect(state => ({
  width: state.sizes.player.width,
  height: state.sizes.player.height,
}))(PlayerJudgeMarkCanvas);
