import React, { Component } from 'react';
import { Modal as ReactstrapModal } from 'reactstrap';
import ModalErrorContent from './ModalErrorContent';
import ModalLoadingContent from './ModalLoadingContent';
import ModalSuccessContent from './ModalSuccessContent';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  state = { isOpen: false };

  close = () => {
    if (this.props.isLoading) {
      return;
    }
    this.setState({ isOpen: false });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoading) {
      this.setState({ isOpen: true });
    }
  }

  render() {
    const { isLoading, id, errors } = this.props;
    const { close } = this;

    return (
      <ReactstrapModal isOpen={this.state.isOpen} toggle={close}>
        {isLoading ? (
          <ModalLoadingContent />
        ) : errors === null ? (
          <ModalSuccessContent close={close} id={id} />
        ) : (
          <ModalErrorContent close={close} errors={errors} />
        )}
      </ReactstrapModal>
    );
  }
}

Modal.propTypes = {
  id: PropTypes.number,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.object,
};
