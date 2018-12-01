import { connect } from 'react-redux';
import PlayerJudgeEffectsCanvas from '../components/PlayerJudgeEffectsCanvas';

const mapStateToProps = state => ({
  width: state.ide.panes.player.width,
  height: state.ide.panes.player.height,
  judgeEffects: state.player.judgeEffects,
  judgeEffectsUpdatedCount: state.player.judgeEffectsUpdatedCount,
});
const mapDispatchToProps = null;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerJudgeEffectsCanvas);
