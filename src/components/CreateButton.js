import React from 'react';
import { Button } from 'reactstrap';
import propTypes from 'prop-types';

const CreateButton = ({ create }) => {
  return (
    <Button color="success" className="my-2 mr-2" onClick={create}>
      保存
    </Button>
  );
};

export default CreateButton;

CreateButton.propTypes = {
  create: propTypes.func,
};
