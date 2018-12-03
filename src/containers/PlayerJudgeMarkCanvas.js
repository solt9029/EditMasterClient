import { connect } from 'react-redux';
import PlayerJudgeMarkCanvas from '../components/PlayerJudgeMarkCanvas';

const mapStateToProps = state => ({
  width: state.sizes.player.width,
  height: state.sizes.player.height,
});
const mapDispatchToProps = null;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerJudgeMarkCanvas);
