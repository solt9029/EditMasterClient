import { connect } from 'react-redux';
import Modal from '../components/Modal';

export default connect(state => ({
  errors: state.score.creating.errors,
  id: state.score.creating.id,
  isLoading: state.score.creating.isLoading,
}))(Modal);
