import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import styled from 'styled-components';
import { Field } from 'redux-form';
import ValidationField from './ValidationField';
import constants from '../../constants';
import { connect } from 'react-redux';
import urlParse from 'url-parse';
import { calcSecondsPerNote } from '../../actions/player';

const StyledDiv = styled.div`
  padding: 15px;
  background-color: #222;
  color: white;
  font-weight: 500;
`;

class Config extends Component {
  componentDidMount() {
    this.props.calcSecondsPerNote(this.props.initialValues.bpm);
  }

  render() {
    return (
      <StyledDiv>
        <Field
          label="ユーザ名"
          component={ValidationField}
          validate={constants.validation.required}
          type="text"
          name="username"
          placeholder="ユーザ名（例：通りすがりの創作の達人）"
        />
        <Field
          label="YouTube動画ID"
          component={ValidationField}
          validate={constants.validation.required}
          type="text"
          name="videoId"
          placeholder="YouTube動画ID（例：PqJNc9KVIZE）"
          normalize={value => {
            // format url to videoId
            const url = urlParse(value, true);
            if (url.query.v) {
              value = url.query.v;
            }
            return value;
          }}
        />
        <Field
          label="BPM"
          component={ValidationField}
          validate={[
            constants.validation.required,
            constants.validation.number,
          ]}
          type="number"
          name="bpm"
          placeholder="BPM（例：200）"
          onChange={event => {
            this.props.calcSecondsPerNote(event.target.value);
          }}
        />
        <Field
          label="OFFSET：曲の始まる時間（秒）"
          component={ValidationField}
          validate={[
            constants.validation.required,
            constants.validation.number,
          ]}
          type="number"
          name="offset"
          placeholder="OFFSET（例：1.5）"
        />
        <Field
          label="コメント"
          component={ValidationField}
          type="text"
          name="comment"
          placeholder="コメント（例：創作の達人で創作譜面をしました！）"
        />
      </StyledDiv>
    );
  }
}

Config = reduxForm({
  form: 'config',
})(Config);

const mapStateToProps = state => ({
  secondsPerNote: state.player.secondsPerNote,
  initialValues: state.config,
});
const mapDispatchToProps = dispatch => ({
  calcSecondsPerNote(bpm) {
    dispatch(calcSecondsPerNote(bpm));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Config);
