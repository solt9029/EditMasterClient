import TjaExportButton from '../components/TjaExportButton';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { exportTjaFile } from '../actions/others';

export default withRouter(
  connect(
    null,
    { exportTjaFile }
  )(TjaExportButton)
);
