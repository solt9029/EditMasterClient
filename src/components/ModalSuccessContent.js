import React, { Fragment } from 'react';
import { ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { openWindow } from '../utils/twitter';
import PropTypes from 'prop-types';

const ModalSuccessContent = ({ id, close }) => {
  const openTweetWindow = () => {
    openWindow(id);
  };

  return (
    <Fragment>
      <ModalHeader toggle={close}>保存が完了しました</ModalHeader>
      <ModalBody>
        <img alt="modal" width="100%" src="/images/modal.png" />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={openTweetWindow}>
          ツイート
        </Button>
        <Button color="warning" tag={Link} to="/scores">
          作品一覧
        </Button>
        <Button color="success" onClick={close}>
          続けて編集
        </Button>
      </ModalFooter>
    </Fragment>
  );
};

export default ModalSuccessContent;

ModalSuccessContent.propTypes = {
  id: PropTypes.number.isRequired,
  close: PropTypes.func.isRequired,
};
