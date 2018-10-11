import React, { Fragment } from 'react';
import { ModalHeader, ModalBody } from 'reactstrap';

const ModalLoadingContent = () => {
  return (
    <Fragment>
      <ModalHeader>保存中です</ModalHeader>
      <ModalBody>しばらくお待ちください。</ModalBody>
    </Fragment>
  );
};

export default ModalLoadingContent;
