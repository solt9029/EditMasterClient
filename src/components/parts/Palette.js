import React, { Component } from 'react';
import { Row, Container, Button } from 'reactstrap';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import NoteRadio from './NoteRadio';
import DivisionRadio from './DivisionRadio';

const StyledDiv = styled.div`
  padding: 15px;
  background-color: #222;
  color: white;
  font-weight: 500;
`;

const StyledContainer = styled(Container)`
  margin-bottom: 30px;
`;

const StyledButton = styled(Button)`
  min-width: 90px;
`;

const noteFields = [
  {
    label: 'ドン',
    value: 'don',
    color: 'danger',
    img: '/images/don.png',
  },
  {
    label: 'カッ',
    value: 'ka',
    color: 'primary',
    img: '/images/ka.png',
  },
  {
    label: '大ドン',
    value: 'bigdon',
    color: 'danger',
    img: '/images/bigdon.png',
  },
  {
    label: '大カッ',
    value: 'bigka',
    color: 'primary',
    img: '/images/bigka.png',
  },
  {
    label: '連打',
    value: 'renda',
    color: 'warning',
    img: '/images/renda.png',
  },
  {
    label: '大連打',
    value: 'bigrenda',
    color: 'warning',
    img: '/images/bigrenda.png',
  },
  {
    label: '風船',
    value: 'balloon',
    color: 'danger',
    img: '/images/balloon.png',
  },
  {
    label: '空白',
    value: 'space',
    color: 'light',
    img: '/images/space.png',
  },
];

const divisionFields = ['12', '16', '32', '48'];

class Palette extends Component {
  render() {
    return (
      <StyledDiv>
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
                />
              );
            })}
          </Row>
        </StyledContainer>
        <StyledButton block color="success">
          行を追加
        </StyledButton>
        <StyledButton block color="danger">
          行を削除
        </StyledButton>
      </StyledDiv>
    );
  }
}

export default reduxForm({
  form: 'palette',
  initialValues: {
    note: 'don',
    division: '16',
  },
})(Palette);
