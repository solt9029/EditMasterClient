import { connect } from 'react-redux';
import PlayerShotsCanvas from '../components/PlayerShotsCanvas';

const mapStateToProps = state => ({
  width: state.sizes.player.width,
  height: state.sizes.player.height,
  shots: state.shots.list,
  updatedCount: state.shots.updatedCount,
});
const mapDispatchToProps = null;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerShotsCanvas);
