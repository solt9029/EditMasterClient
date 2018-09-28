import React, { Component } from 'react';
import { Row, Container, Button } from 'reactstrap';
import styled from 'styled-components';
import NoteRadio from './NoteRadio';
import DivisionRadio from './DivisionRadio';
import constants from '../../constants';
import { connect } from 'react-redux';
import { toggleMode, addStateBar, removeStateBar } from '../../actions/player';
import { addIdBar, removeIdBar } from '../../actions/editor';
import { setPaletteNote, resetPalette } from '../../actions/palette';

const StyledDiv = styled.div`
  padding: 15px;
  background-color: #222;
  color: white;
  font-weight: 500;
`;

const StyledContainer = styled(Container)`
  margin-bottom: 30px;
`;

const LineButton = styled(Button)`
  min-width: 90px;
`;

const ModeButton = styled(Button)`
  margin-bottom: 30px;
  min-width: 180px;
`;

const noteFields = [
  {
    label: 'ドン',
    value: constants.id.note.don,
    color: 'danger',
    img: '/images/don.png',
  },
  {
    label: 'カッ',
    value: constants.id.note.ka,
    color: 'primary',
    img: '/images/ka.png',
  },
  {
    label: '大ドン',
    value: constants.id.note.bigdon,
    color: 'danger',
    img: '/images/bigdon.png',
  },
  {
    label: '大カッ',
    value: constants.id.note.bigka,
    color: 'primary',
    img: '/images/bigka.png',
  },
  {
    label: '連打',
    value: constants.id.note.renda,
    color: 'warning',
    img: '/images/renda.png',
  },
  {
    label: '大連打',
    value: constants.id.note.bigrenda,
    color: 'warning',
    img: '/images/bigrenda.png',
  },
  {
    label: '風船',
    value: constants.id.note.balloon,
    color: 'danger',
    img: '/images/balloon.png',
  },
  {
    label: '空白',
    value: constants.id.note.space,
    color: 'light',
    img: '/images/space.png',
  },
];

const divisionFields = [16, 24, 32, 48];

class Palette extends Component {
  componentWillUnmount() {
    this.props.resetPalette();
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
        <StyledContainer>
          <Row>
            {noteFields.map((field, i) => {
              return (
                <NoteRadio
                  key={i}
                  img={field.img}
                  color={field.color}
                  label={field.label}
                  name="note"
                  value={field.value}
                />
              );
            })}
          </Row>
        </StyledContainer>
        <label>1小節あたりの分割数</label>
        <StyledContainer>
          <Row>
            {divisionFields.map((value, i) => {
              return <DivisionRadio key={i} name="division" value={value} />;
            })}
          </Row>
        </StyledContainer>
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

const mapStateToProps = state => ({
  isAutoMode: state.player.isAutoMode,
});
const mapDispatchToProps = dispatch => ({
  toggleMode() {
    dispatch(toggleMode());
  },
  addBar() {
    dispatch(addStateBar());
    dispatch(addIdBar());
  },
  removeBar() {
    dispatch(removeStateBar());
    dispatch(removeIdBar());
  },
  setPaletteNote() {
    dispatch(setPaletteNote());
  },
  resetPalette() {
    dispatch(resetPalette());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Palette);
