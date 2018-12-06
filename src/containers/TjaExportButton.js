import TjaExportButton from '../components/TjaExportButton';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  config: state.score,
  notes: state.score.notes.list,
  updatedCount: state.score.notes.updatedCount,
});
const mapDispatchToProps = null;
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TjaExportButton)
);
