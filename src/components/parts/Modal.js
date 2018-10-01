import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Modal as ReactstrapModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap';
import { closeModal } from '../../actions/modal';
import { Link } from 'react-router-dom';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.openTweetWindow = this.openTweetWindow.bind(this);
  }

  componentWillUnmount() {
    this.props.closeModal();
  }

  openTweetWindow() {
    const text = '創作譜面をしました！';
    const url = `http://${window.location.host}/scores/${this.props.modal.id}`;
    const hashtags = '創作の達人';
    let newWindow = window.open('', 'child', 'width=600, height=300');
    newWindow.location.href = `https://twitter.com/share?text=${text}&hashtags=${hashtags}&url=${url}&count=none&lang=ja`;
  }

  renderLoading() {
    return (
      <Fragment>
        <ModalHeader>保存中です</ModalHeader>
        <ModalBody>しばらくお待ちください。</ModalBody>
      </Fragment>
    );
  }

  renderSuccess() {
    return (
      <Fragment>
        <ModalHeader toggle={this.props.closeModal}>
          保存が完了しました
        </ModalHeader>
        <ModalBody>
          <img alt="modal" width="100%" src="/images/modal.png" />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.openTweetWindow}>
            ツイート
          </Button>
          <Button color="warning" tag={Link} to="/scores">
            作品一覧
          </Button>
          <Button
            color="success"
            onClick={() => {
              this.props.closeModal();
            }}
          >
            続けて編集
          </Button>
        </ModalFooter>
      </Fragment>
    );
  }

  renderError() {
    let errors = [];
    for (let field in this.props.modal.errors) {
      for (let i = 0; i < this.props.modal.errors[field].length; i++) {
        errors.push(<div>● {this.props.modal.errors[field][i]}</div>);
      }
    }

    return (
      <Fragment>
        <ModalHeader toggle={this.props.closeModal}>
          保存中にエラーが発生しました
        </ModalHeader>
        <ModalBody>{errors}</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.props.closeModal}>
            閉じる
          </Button>
        </ModalFooter>
      </Fragment>
    );
  }

  render() {
    let content;
    if (this.props.modal.isLoading) {
      content = this.renderLoading();
    } else {
      if (this.props.modal.errors === null) {
        content = this.renderSuccess();
      } else {
        content = this.renderError();
      }
    }

    return (
      <ReactstrapModal
        isOpen={this.props.modal.isOpen}
        toggle={!this.props.modal.isLoading && this.props.closeModal}
      >
        {content}
      </ReactstrapModal>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modal,
});
const mapDispatchToProps = dispatch => ({
  closeModal() {
    dispatch(closeModal());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
