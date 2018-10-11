import React, { Fragment } from 'react';
import { ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as utils from '../utils';
import propTypes from 'prop-types';

const ModalSuccessContent = ({ id, close }) => {
  return (
    <Fragment>
      <ModalHeader toggle={close}>保存が完了しました</ModalHeader>
      <ModalBody>
        <img alt="modal" width="100%" src="/images/modal.png" />
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => {
            utils.twitter.openWindow(id);
          }}
        >
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
  id: propTypes.number,
  close: propTypes.func,
};
