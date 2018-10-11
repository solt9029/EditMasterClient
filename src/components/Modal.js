import React, { Component } from 'react';
import { Modal as ReactstrapModal } from 'reactstrap';
import ModalErrorContent from './ModalErrorContent';
import ModalLoadingContent from './ModalLoadingContent';
import ModalSuccessContent from './ModalSuccessContent';
import propTypes from 'prop-types';

export default class Modal extends Component {
  componentWillUnmount() {
    this.props.close();
  }

  render() {
    const { isLoading, id, errors, isOpen } = this.props.modal;

    let component;
    if (isLoading) {
      component = <ModalLoadingContent />;
    } else if (errors === null) {
      component = <ModalSuccessContent close={this.props.close} id={id} />;
    } else {
      component = (
        <ModalErrorContent close={this.props.close} errors={errors} />
      );
    }

    return (
      <ReactstrapModal
        isOpen={isOpen}
        toggle={!isLoading ? this.props.close : () => {}}
      >
        {component}
      </ReactstrapModal>
    );
  }
}

Modal.propTypes = {
  close: propTypes.func,
  modal: propTypes.shape({
    id: propTypes.number,
    isOpen: propTypes.bool,
    isLoading: propTypes.bool,
    errors: propTypes.object,
  }),
};
