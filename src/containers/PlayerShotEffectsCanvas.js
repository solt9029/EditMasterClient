import { connect } from 'react-redux';
import PlayerShotEffectsCanvas from '../components/PlayerShotEffectsCanvas';

export default connect(state => ({
  width: state.sizes.player.width,
  height: state.sizes.player.height,
  shots: state.effects.shots.list,
  updatedCount: state.effects.shots.updatedCount,
}))(PlayerShotEffectsCanvas);
