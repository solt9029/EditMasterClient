import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import NoteButtonList from '../containers/NoteButtonList';
import DivisionButtonList from '../containers/DivisionButtonList';

const BarButton = styled(Button)`
  min-width: 90px;
`;

const ModeButton = styled(Button)`
  margin-bottom: 30px;
  min-width: 180px;
`;

export default class Palette extends Component {
  render() {
    return (
      <Fragment>
        <ModeButton
          block
          color={this.props.isAutoMode ? 'danger' : 'primary'}
          onClick={() => {
            this.props.toggleMode();
          }}
        >
          {this.props.isAutoMode ? 'プレイモードにする' : 'オート再生にする'}
        </ModeButton>
        <label>譜面の種類</label>
        <NoteButtonList paletteWidth={this.props.width} />
        <label>1小節あたりの分割数</label>
        <DivisionButtonList paletteWidth={this.props.width} />
        <BarButton
          block
          color="success"
          onClick={() => {
            this.props.addBar();
          }}
        >
          行を追加
        </BarButton>
        <BarButton
          block
          color="danger"
          onClick={() => {
            this.props.removeBar();
          }}
        >
          行を削除
        </BarButton>
      </Fragment>
    );
  }
}
