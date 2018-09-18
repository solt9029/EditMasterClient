import React, { Component } from 'react';
import { reduxForm, change } from 'redux-form';
import styled from 'styled-components';
import { Field } from 'redux-form';
import ValidationField from './ValidationField';
import { required, number } from '../../validation';
import { initialValues } from '../../reducers/form/config';
import { connect } from 'react-redux';
import urlParse from 'url-parse';

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
    label: 'YouTube動画ID',
    validate: required,
    type: 'text',
    name: 'videoId',
    placeholder: 'YouTube動画ID（例：PqJNc9KVIZE）',
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
  constructor(props) {
    super(props);
    this.formatVideoId = this.formatVideoId.bind(this);
  }

  formatVideoId(event) {
    let value = event.target.value;
    event.preventDefault();

    // format url to videoId
    const url = urlParse(value, true);
    value = url.query.v && url.query.v;

    this.props.setVideoId('videoId', value);
  }

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
              onChange={field.name === 'videoId' && this.formatVideoId}
            />
          );
        })}
      </StyledDiv>
    );
  }
}

const mapStateToProps = state => ({
  config: state.form.config,
});
const mapDispatchToProps = dispatch => ({
  setVideoId(field, value) {
    dispatch(change('config', field, value));
  },
});
Config = connect(
  mapStateToProps,
  mapDispatchToProps
)(Config);

export default reduxForm({
  form: 'config',
  initialValues,
})(Config);
