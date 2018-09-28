import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import {
  openSuccessModal,
  closeSuccessModal,
} from '../../actions/successModal';

class SuccessModal extends Component {
  componentWillUnmount() {
    this.props.closeSuccessModal();
  }

  render() {
    return (
      <Modal
        isOpen={this.props.successModal.isOpen}
        toggle={this.props.closeSuccessModal}
      >
        <ModalHeader toggle={this.props.closeSuccessModal}>
          保存が完了しました
        </ModalHeader>
        <ModalBody>
          <img alt="modal" width="100%" src="/images/modal.png" />
        </ModalBody>
        <ModalFooter>
          <Button color="primary">ツイート</Button>
          <Button color="warning">作品一覧</Button>
          <Button color="success">続けて編集</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  successModal: state.successModal,
});
const mapDispatchToProps = dispatch => ({
  openSuccessModal() {
    dispatch(openSuccessModal());
  },
  closeSuccessModal() {
    dispatch(closeSuccessModal());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuccessModal);
