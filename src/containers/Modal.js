import { connect } from 'react-redux';
import { close } from '../actions/modal';
import Modal from '../components/Modal';

const mapStateToProps = state => ({
  modal: state.modal,
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
