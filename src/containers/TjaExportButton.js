import TjaExportButton from '../components/TjaExportButton';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

export default withRouter(
  connect(state => ({
    config: state.score,
    notes: state.score.notes.list,
    updatedCount: state.score.notes.updatedCount,
  }))(TjaExportButton)
);
