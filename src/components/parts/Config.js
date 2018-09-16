import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import styled from 'styled-components';
import { Field } from 'redux-form';
import ValidationField from './ValidationField';
import { required, number } from '../../validation';

const StyledDiv = styled.div`
  padding: 15px;
  background-color: #222;
  color: white;
  font-weight: 500;
`;

const fields = [
  {
    label: 'ユーザ名',
    validate: required,
    type: 'text',
    name: 'username',
    placeholder: 'ユーザ名（例：通りすがりの創作の達人）',
  },
  {
    label: 'YouTube動画URL',
    validate: required,
    type: 'text',
    name: 'videoId',
    placeholder:
      'YouTube動画URL（例：https://www.youtube.com/watch?v=PqJNc9KVIZE）',
  },
  {
    label: 'BPM',
    validate: [required, number],
    type: 'number',
    name: 'bpm',
    placeholder: 'BPM（例：200）',
  },
  {
    label: 'OFFSET：曲の始まる時間（秒）',
    validate: [required, number],
    type: 'number',
    name: 'offset',
    placeholder: 'OFFSET（例：1.5）',
  },
  {
    label: 'コメント',
    validate: null,
    type: 'text',
    name: 'comment',
    placeholder: 'コメント（例：創作の達人で創作譜面をしました！）',
  },
];

class Config extends Component {
  render() {
    return (
      <StyledDiv>
        {fields.map((field, i) => {
          return (
            <Field
              key={i}
              label={field.label}
              component={ValidationField}
              validate={field.validate}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
            />
          );
        })}
      </StyledDiv>
    );
  }
}

export default reduxForm({
  form: 'config',
  initialValues: {
    username: '通りすがりの創作の達人',
    videoId: 'https://www.youtube.com/watch?v=PqJNc9KVIZE',
    bpm: 150,
    offset: 12,
    comment: '創作の達人で創作譜面をしました！',
  },
})(Config);
