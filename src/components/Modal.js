import React, { Component } from 'react';
import { Modal as ReactstrapModal } from 'reactstrap';
import ModalErrorContent from './ModalErrorContent';
import ModalLoadingContent from './ModalLoadingContent';
import ModalSuccessContent from './ModalSuccessContent';
import propTypes from 'prop-types';

export default class Modal extends Component {
  state = { isOpen: false };

  close = () => {
    if (this.props.isLoading) {
      return;
    }
    this.setState({
      isOpen: false,
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoading) {
      this.setState({
        isOpen: true,
      });
    }
  }

  render() {
    const { isLoading, id, errors } = this.props;
    const { isOpen } = this.state;

    return (
      <ReactstrapModal isOpen={isOpen} toggle={this.close}>
        {isLoading ? (
          <ModalLoadingContent />
        ) : errors === null ? (
          <ModalSuccessContent close={this.close} id={id} />
        ) : (
          <ModalErrorContent close={this.close} errors={errors} />
        )}
      </ReactstrapModal>
    );
  }
}

Modal.propTypes = {
  id: propTypes.number,
  isLoading: propTypes.bool.isRequired,
  errors: propTypes.object,
};
