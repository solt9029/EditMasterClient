import { connect } from 'react-redux';
import Modal from '../components/Modal';

const mapStateToProps = state => ({
  errors: state.score.creating.errors,
  id: state.score.creating.id,
  isLoading: state.score.creating.isLoading,
});
const mapDispatchToProps = null;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
