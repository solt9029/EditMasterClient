import React, { Component } from 'react';
import styled from 'styled-components';
import urlParse from 'url-parse';
import { FormFeedback, Input, Label, FormGroup } from 'reactstrap';

const StyledDiv = styled.div`
  padding: 15px;
  background-color: #222;
  color: white;
  font-weight: 500;
`;

export default class Config extends Component {
  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    return (
      <StyledDiv>
        <FormGroup>
          <Label>ユーザ名</Label>
          <Input
            type="text"
            placeholder="ユーザ名（例：通りすがりの創作の達人）"
            name="username"
            invalid={
              this.props.username.touched &&
              this.props.username.errors.length > 0
            }
            value={this.props.username.value}
            onChange={event => {
              this.props.setUsername(event.target.value);
            }}
          />
          {this.props.username.errors.map((error, i) => {
            return <FormFeedback key={i}>{error}</FormFeedback>;
          })}
        </FormGroup>
        <FormGroup>
          <Label>YouTube動画ID</Label>
          <Input
            type="text"
            placeholder="YouTube動画ID（例：PqJNc9KVIZE）"
            name="videoId"
            invalid={
              this.props.videoId.touched && this.props.videoId.errors.length > 0
            }
            value={this.props.videoId.value}
            onChange={event => {
              const { value } = event.target;
              let videoId = value;
              const url = urlParse(value, true);
              if (url.query.v) {
                videoId = url.query.v;
              }
              this.props.setVideoId(videoId);
              this.props.fetchSongle(videoId);
            }}
          />
          {this.props.videoId.errors.map((error, i) => {
            return <FormFeedback key={i}>{error}</FormFeedback>;
          })}
        </FormGroup>
        <FormGroup>
          <Label>BPM</Label>
          <Input
            type="number"
            placeholder="BPM（例：200）"
            name="bpm"
            invalid={this.props.bpm.touched && this.props.bpm.errors.length > 0}
            value={this.props.bpm.value}
            onChange={event => {
              this.props.setBpm(event.target.value);
            }}
          />
          {this.props.bpm.errors.map((error, i) => {
            return <FormFeedback key={i}>{error}</FormFeedback>;
          })}
        </FormGroup>
        <FormGroup>
          <Label>OFFSET：曲の始まる時間（秒）</Label>
          <Input
            type="number"
            placeholder="OFFSET（例：1.5）"
            name="offset"
            invalid={
              this.props.offset.touched && this.props.offset.errors.length > 0
            }
            value={this.props.offset.value}
            onChange={event => {
              this.props.setOffset(event.target.value);
            }}
          />
          {this.props.offset.errors.map((error, i) => {
            return <FormFeedback key={i}>{error}</FormFeedback>;
          })}
        </FormGroup>
        <FormGroup>
          <Label>倍速</Label>
          <Input
            type="number"
            placeholder="倍速（例：2）"
            name="speed"
            invalid={
              this.props.speed.touched && this.props.speed.errors.length > 0
            }
            value={this.props.speed.value}
            onChange={event => {
              this.props.setSpeed(event.target.value);
            }}
          />
          {this.props.speed.errors.map((error, i) => {
            return <FormFeedback key={i}>{error}</FormFeedback>;
          })}
        </FormGroup>
        <FormGroup>
          <Label>コメント</Label>
          <Input
            type="text"
            placeholder="コメント（例：創作の達人で創作譜面をしました！）"
            name="comment"
            invalid={
              this.props.comment.touched && this.props.comment.errors.length > 0
            }
            value={this.props.comment.value}
            onChange={event => {
              this.props.setComment(event.target.value);
            }}
          />
          {this.props.comment.errors.map((error, i) => {
            return <FormFeedback key={i}>{error}</FormFeedback>;
          })}
        </FormGroup>
      </StyledDiv>
    );
  }
}
