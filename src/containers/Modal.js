import { connect } from 'react-redux';
import { close } from '../actions/modal';
import Modal from '../components/Modal';

const mapStateToProps = state => ({
  id: state.modal.id,
  isOpen: state.modal.isOpen,
  isLoading: state.modal.isLoading,
  errors: state.modal.errors,
});
const mapDispatchToProps = dispatch => ({
  close() {
    dispatch(close());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
