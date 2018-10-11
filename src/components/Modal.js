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
    const { isLoading, id, errors, isOpen, close } = this.props;

    let component;
    if (isLoading) {
      component = <ModalLoadingContent />;
    } else if (errors === null) {
      component = <ModalSuccessContent close={close} id={id} />;
    } else {
      component = <ModalErrorContent close={close} errors={errors} />;
    }

    return (
      <ReactstrapModal isOpen={isOpen} toggle={!isLoading ? close : () => {}}>
        {component}
      </ReactstrapModal>
    );
  }
}

Modal.propTypes = {
  id: propTypes.number,
  isOpen: propTypes.bool,
  isLoading: propTypes.bool,
  errors: propTypes.object,
  close: propTypes.func,
};
