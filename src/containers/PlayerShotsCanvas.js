import { connect } from 'react-redux';
import PlayerShotsCanvas from '../components/PlayerShotsCanvas';

export default connect(state => ({
  width: state.sizes.player.width,
  height: state.sizes.player.height,
  shots: state.effects.shots.list,
  updatedCount: state.effects.shots.updatedCount,
}))(PlayerShotsCanvas);
