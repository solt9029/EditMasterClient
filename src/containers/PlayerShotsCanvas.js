import { connect } from 'react-redux';
import PlayerShotsCanvas from '../components/PlayerShotsCanvas';

const mapStateToProps = state => ({
  width: state.ide.panes.player.width,
  height: state.ide.panes.player.height,
  shots: state.player.shots,
  shotsUpdatedCount: state.player.shotsUpdatedCount,
});
const mapDispatchToProps = null;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerShotsCanvas);
