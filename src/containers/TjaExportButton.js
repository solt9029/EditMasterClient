import TjaExportButton from '../components/TjaExportButton';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  config: state.config,
  notes: state.editor.notes,
});
const mapDispatchToProps = null;
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TjaExportButton)
);
