import { connect } from 'react-redux';
import PlayerJudgeMarkCanvas from '../components/PlayerJudgeMarkCanvas';

const mapStateToProps = state => ({
  width: state.ide.panes.player.width,
  height: state.ide.panes.player.height,
});
const mapDispatchToProps = null;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerJudgeMarkCanvas);
