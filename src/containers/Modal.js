import { connect } from 'react-redux';
import Modal from '../components/Modal';

const mapStateToProps = state => ({
  errors: state.modal.errors,
  id: state.modal.id,
  isLoading: state.modal.isLoading,
});
const mapDispatchToProps = null;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
