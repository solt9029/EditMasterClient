import withRouter from 'react-router-dom/withRouter';
import { connect } from 'react-redux';
import { createScore } from '../actions/modal';
import CreateButton from '../components/CreateButton';

export default withRouter(
  connect(
    null,
    { createScore }
  )(CreateButton)
);
