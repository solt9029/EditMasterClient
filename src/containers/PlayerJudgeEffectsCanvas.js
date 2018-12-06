import { connect } from 'react-redux';
import PlayerJudgeEffectsCanvas from '../components/PlayerJudgeEffectsCanvas';

export default connect(state => ({
  width: state.sizes.player.width,
  height: state.sizes.player.height,
  judgeEffects: state.effects.judges.list,
  updatedCount: state.effects.judges.updatedCount,
}))(PlayerJudgeEffectsCanvas);
