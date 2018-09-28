import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { openErrorModal, closeErrorModal } from '../../actions/errorModal';

class ErrorModal extends Component {
  render() {
    let errors = [];
    for (let field in this.props.errorModal.errors) {
      for (let i = 0; i < this.props.errorModal.errors[field].length; i++) {
        errors.push(<div>● {this.props.errorModal.errors[field][i]}</div>);
      }
    }

    return (
      <Modal
        isOpen={this.props.errorModal.isOpen}
        toggle={this.props.closeErrorModal}
      >
        <ModalHeader toggle={this.props.closeErrorModal}>
          保存エラー
        </ModalHeader>
        <ModalBody>{errors}</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.props.closeErrorModal}>
            閉じる
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  errorModal: state.errorModal,
});
const mapDispatchToProps = dispatch => ({
  openErrorModal(errors) {
    dispatch(openErrorModal(errors));
  },
  closeErrorModal() {
    dispatch(closeErrorModal());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorModal);
