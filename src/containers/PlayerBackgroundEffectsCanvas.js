import { connect } from 'react-redux';
import PlayerBackgroundEffectsCanvas from '../components/PlayerBackgroundEffectsCanvas';

export default connect(state => ({
  width: state.sizes.player.width,
  height: state.sizes.player.height,
  backgroundEffects: state.effects.backgrounds.list,
  updatedCount: state.effects.backgrounds.updatedCount,
}))(PlayerBackgroundEffectsCanvas);
