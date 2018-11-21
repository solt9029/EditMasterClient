import React, { Component } from 'react';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import NoteButtonList from '../containers/NoteButtonList';
import DivisionButtonList from '../containers/DivisionButtonList';

const StyledDiv = styled.div`
  padding: 15px;
  background-color: #222;
  color: white;
  font-weight: 500;
`;

const LineButton = styled(Button)`
  min-width: 90px;
`;

const ModeButton = styled(Button)`
  margin-bottom: 30px;
  min-width: 180px;
`;

export default class Palette extends Component {
  componentWillUnmount() {
    this.props.reset();
  }
  render() {
    return (
      <StyledDiv>
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
        <LineButton
          block
          color="success"
          onClick={() => {
            this.props.addBar();
          }}
        >
          行を追加
        </LineButton>
        <LineButton
          block
          color="danger"
          onClick={() => {
            this.props.removeBar();
          }}
        >
          行を削除
        </LineButton>
      </StyledDiv>
    );
  }
}
