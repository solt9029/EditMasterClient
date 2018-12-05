import React from 'react';
import { Button } from 'reactstrap';
import propTypes from 'prop-types';

const CreateButton = ({ createScore }) => {
  return (
    <Button color="success" className="my-2 mr-2" onClick={createScore}>
      保存
    </Button>
  );
};

export default CreateButton;

CreateButton.propTypes = {
  createScore: propTypes.func,
};
