import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import {
  openSuccessModal,
  closeSuccessModal,
} from '../../actions/successModal';
import { Link } from 'react-router-dom';
import withRouter from 'react-router-dom/withRouter';

class SuccessModal extends Component {
  constructor(props) {
    super(props);
    this.openTweetWindow = this.openTweetWindow.bind(this);
  }
  componentWillUnmount() {
    this.props.closeSuccessModal();
  }

  openTweetWindow() {
    const text = '創作譜面をしました！';
    const url = `http://${window.location.host}/scores/${
      this.props.successModal.id
    }`;
    const hashtags = '創作の達人';
    let newWindow = window.open('', 'child', 'width=600, height=300');
    newWindow.location.href = `https://twitter.com/share?text=${text}&hashtags=${hashtags}&url=${url}&count=none&lang=ja`;
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
          <Button color="primary" onClick={this.openTweetWindow}>
            ツイート
          </Button>
          <Button color="warning" tag={Link} to="/scores" target="_blank">
            作品一覧
          </Button>
          <Button
            color="success"
            onClick={() => {
              this.props.closeSuccessModal();
            }}
          >
            続けて編集
          </Button>
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
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SuccessModal)
);
