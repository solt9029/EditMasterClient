import { connect } from 'react-redux';
import { setSizes } from '../actions/sizes';
import { resetIDE } from '../actions/others';
import IDE from '../components/IDE';

export default connect(
  null,
  { setSizes, resetIDE }
)(IDE);
