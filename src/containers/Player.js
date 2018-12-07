import { connect } from 'react-redux';
import { doPlayMode } from '../actions/others';
import Player from '../components/Player';

export default connect(
  null,
  { doPlayMode }
)(Player);
