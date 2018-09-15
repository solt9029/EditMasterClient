import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Form, Input, FormGroup, Label } from 'reactstrap';
import styled from 'styled-components';
import { Field } from 'redux-form';

const StyledDiv = styled.div`
  background-color: #ccc;
  width: 100%;
  height: 100%;
`;

const StyledForm = styled(Form)`
  padding: 15px;
  width: 100%;
  height: 100%;
  background-color: #222;
  color: white;
  font-weight: 500;
`;

class Config extends Component {
  render() {
    return (
      <StyledDiv>
        <StyledForm>
          <FormGroup>
            <Label for="username">ユーザ名</Label>
            <Input
              tag={Field}
              component="input"
              type="text"
              name="username"
              placeholder="ユーザ名（例：通りすがりの創作の達人）"
            />
          </FormGroup>
          <FormGroup>
            <Label for="videoId">YouTube動画URL</Label>
            <Input
              tag={Field}
              component="input"
              type="text"
              name="videoId"
              placeholder="YouTube動画URL（例：https://www.youtube.com/watch?v=PqJNc9KVIZE）"
            />
          </FormGroup>
          <FormGroup>
            <Label for="bpm">BPM</Label>
            <Input
              tag={Field}
              component="input"
              type="number"
              name="bpm"
              placeholder="BPM（例：200）"
            />
          </FormGroup>
          <FormGroup>
            <Label for="offset">OFFSET：曲の始まる時間（秒）</Label>
            <Input
              tag={Field}
              component="input"
              type="number"
              name="offset"
              placeholder="OFFSET（例：1.5）"
            />
          </FormGroup>
          <FormGroup>
            <Label for="comment">コメント</Label>
            <Input
              tag={Field}
              component="input"
              type="text"
              name="comment"
              placeholder="コメント（例：創作の達人で創作譜面をしました！）"
            />
          </FormGroup>
        </StyledForm>
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
