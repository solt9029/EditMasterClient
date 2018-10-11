import React, { Fragment } from 'react';
import { ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const ModalErrorContent = ({ errors, close }) => {
  let errorList = [];
  for (let form in errors) {
    for (let i = 0; i < errors[form].length; i++) {
      errorList.push(<div>● {errors[form][i]}</div>);
    }
  }

  return (
    <Fragment>
      <ModalHeader toggle={close}>保存中にエラーが発生しました</ModalHeader>
      <ModalBody>{errorList}</ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={close}>
          閉じる
        </Button>
      </ModalFooter>
    </Fragment>
  );
};

export default ModalErrorContent;
