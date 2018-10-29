import React, { Component } from 'react';
import { Button } from 'reactstrap';
import propTypes from 'prop-types';
import * as utils from '../utils';

export default class TjaExportButton extends Component {
  exportFile = () => {
    const { notes, config } = this.props;
    utils.tja.exportFile(
      notes,
      config.videoId.value,
      config.bpm.value,
      config.offset.value
    );
  };

  render() {
    return (
      <Button color="info" className="my-2 mr-2" onClick={this.exportFile}>
        太鼓さん次郎エクスポート
      </Button>
    );
  }
}

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
