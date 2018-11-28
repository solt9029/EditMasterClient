import React from 'react';
import { Button } from 'reactstrap';
import propTypes from 'prop-types';
import { exportTja } from '../utils/file';

const TjaExportButton = ({ notes, config }) => {
  const exportTjaFile = () => {
    exportTja(
      notes,
      config.videoId.value,
      config.bpm.value,
      config.offset.value
    );
  };

  return (
    <Button color="info" className="my-2 mr-2" onClick={exportTjaFile}>
      太鼓さん次郎エクスポート
    </Button>
  );
};

export default TjaExportButton;

TjaExportButton.propTypes = {
  notes: propTypes.arrayOf(propTypes.number),
  config: propTypes.shape({
    videoId: propTypes.shape({
      value: propTypes.string,
    }),
    bpm: propTypes.shape({
      value: propTypes.number,
    }),
    offset: propTypes.shape({
      value: propTypes.number,
    }),
  }),
};
