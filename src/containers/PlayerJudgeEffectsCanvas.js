import { connect } from 'react-redux';
import PlayerJudgeEffectsCanvas from '../components/PlayerJudgeEffectsCanvas';

const mapStateToProps = state => ({
  width: state.sizes.player.width,
  height: state.sizes.player.height,
  judgeEffects: state.judgeEffects.list,
  updatedCount: state.judgeEffects.updatedCount,
});
const mapDispatchToProps = null;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerJudgeEffectsCanvas);
