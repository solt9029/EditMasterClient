import React, { Component } from 'react';
import { Form, Row, Container, Col } from 'reactstrap';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import NoteRadio from './NoteRadio';

const StyledContainer = styled(Container)`
  padding: 15px;
  width: 100%;
  height: 100%;
  background-color: #222;
  color: white;
  font-weight: 500;
`;

const noteFields = [
  {
    label: 'ドン',
    value: 'don',
  },
  {
    label: 'カッ',
    value: 'ka',
  },
  {
    label: '大ドン',
    value: 'bigdon',
  },
  {
    label: '大カッ',
    value: 'bigka',
  },
  {
    label: '連打',
    value: 'renda',
  },
  {
    label: '大連打',
    value: 'bigrenda',
  },
  {
    label: '風船',
    value: 'balloon',
  },
  {
    label: '空白',
    value: 'space',
  },
];

class Palette extends Component {
  render() {
    return (
      <StyledContainer className="btn-group-toggle">
        {noteFields.map((field, i) => {
          return (
            <Field
              key={i}
              label={field.label}
              name="note"
              component={NoteRadio}
              type="radio"
              value={field.value}
            />
          );
        })}
      </StyledContainer>
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
