import { connect } from 'react-redux';
import PlayerJudgeEffectsCanvas from '../components/PlayerJudgeEffectsCanvas';

const mapStateToProps = state => ({
  width: state.ide.panes.player.width,
  height: state.ide.panes.player.height,
  judgeEffects: state.judgeEffects.list,
  updatedCount: state.judgeEffects.updatedCount,
});
const mapDispatchToProps = null;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerJudgeEffectsCanvas);
