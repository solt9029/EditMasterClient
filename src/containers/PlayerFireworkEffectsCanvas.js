import { connect } from 'react-redux';
import PlayerFireworkEffectsCanvas from '../components/PlayerFireworkEffectsCanvas';

export default connect(state => ({
  width: state.sizes.player.width,
  height: state.sizes.player.height,
  fireworkEffects: state.effects.fireworks.list,
  updatedCount: state.effects.fireworks.updatedCount,
}))(PlayerFireworkEffectsCanvas);
