import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const TjaExportButton = ({ exportTjaFile }) => (
  <Button color="info" className="my-2 mr-2" onClick={exportTjaFile}>
    太鼓さん次郎エクスポート
  </Button>
);

export default TjaExportButton;

TjaExportButton.propTypes = {
  exportTjaFile: PropTypes.func,
};
