import React, { Component } from 'react';
import { Row, Container, Button } from 'reactstrap';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import NoteRadio from './NoteRadio';
import DivisionRadio from './DivisionRadio';
import { initialValues } from '../../reducers/form/palette';
import { id } from '../../constants';
import { connect } from 'react-redux';
import { toggleMode } from '../../actions/player';

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
    value: id.don,
    color: 'danger',
    img: '/images/don.png',
  },
  {
    label: 'カッ',
    value: id.ka,
    color: 'primary',
    img: '/images/ka.png',
  },
  {
    label: '大ドン',
    value: id.bigdon,
    color: 'danger',
    img: '/images/bigdon.png',
  },
  {
    label: '大カッ',
    value: id.bigka,
    color: 'primary',
    img: '/images/bigka.png',
  },
  {
    label: '連打',
    value: id.renda,
    color: 'warning',
    img: '/images/renda.png',
  },
  {
    label: '大連打',
    value: id.bigrenda,
    color: 'warning',
    img: '/images/bigrenda.png',
  },
  {
    label: '風船',
    value: id.balloon,
    color: 'danger',
    img: '/images/balloon.png',
  },
  {
    label: '空白',
    value: id.space,
    color: 'light',
    img: '/images/space.png',
  },
];

const divisionFields = [16, 24, 32, 48];

class Palette extends Component {
  render() {
    return (
      <StyledDiv>
        <ModeButton
          block
          color="info"
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
                <Field
                  img={field.img}
                  color={field.color}
                  key={i}
                  label={field.label}
                  name="note"
                  component={NoteRadio}
                  type="radio"
                  value={field.value}
                  normalize={value => +value}
                />
              );
            })}
          </Row>
        </StyledContainer>
        <label>1小節あたりの分割数</label>
        <StyledContainer>
          <Row>
            {divisionFields.map((value, i) => {
              return (
                <Field
                  key={i}
                  name="division"
                  component={DivisionRadio}
                  type="radio"
                  value={value}
                  normalize={value => +value}
                />
              );
            })}
          </Row>
        </StyledContainer>
        <LineButton block color="success">
          行を追加
        </LineButton>
        <LineButton block color="danger">
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
});
Palette = connect(
  mapStateToProps,
  mapDispatchToProps
)(Palette);

export default reduxForm({
  form: 'palette',
  initialValues,
})(Palette);
