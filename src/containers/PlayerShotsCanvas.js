import { connect } from 'react-redux';
import PlayerShotsCanvas from '../components/PlayerShotsCanvas';

const mapStateToProps = state => ({
  width: state.ide.panes.player.width,
  height: state.ide.panes.player.height,
  shots: state.shots.list,
  updatedCount: state.shots.updatedCount,
});
const mapDispatchToProps = null;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerShotsCanvas);
