import React, { Component } from 'react';
import styled from 'styled-components';
import * as utils from '../utils';
import Form from './Form';

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
    const {
      username,
      videoId,
      bpm,
      offset,
      speed,
      comment,
      setUsername,
      setVideoId,
      setBpm,
      setOffset,
      setSpeed,
      setComment,
      fetchSongle,
    } = this.props;

    return (
      <StyledDiv>
        <Form
          label="ユーザ名"
          type="text"
          placeholder="ユーザ名（例：通りすがりの創作の達人）"
          name="username"
          object={username}
          onChange={event => {
            setUsername(event.target.value);
          }}
        />
        <Form
          label="YouTube動画ID"
          type="text"
          placeholder="YouTube動画ID（例：PqJNc9KVIZE）"
          name="videoId"
          object={videoId}
          onChange={event => {
            const videoId = utils.urls.getVideoId(event.target.value);
            setVideoId(videoId);
            fetchSongle(videoId);
          }}
        />
        <Form
          label="BPM"
          type="number"
          placeholder="BPM（例：200）"
          name="bpm"
          object={bpm}
          onChange={event => {
            setBpm(event.target.value);
          }}
        />
        <Form
          label="OFFSET：曲の始まる時間（秒）"
          type="number"
          placeholder="OFFSET（例：1.5）"
          name="offset"
          object={offset}
          onChange={event => {
            setOffset(event.target.value);
          }}
        />
        <Form
          label="倍速"
          type="number"
          placeholder="倍速（例：2）"
          name="speed"
          object={speed}
          onChange={event => {
            setSpeed(event.target.value);
          }}
        />
        <Form
          label="コメント"
          type="text"
          placeholder="コメント（例：創作の達人で創作譜面をしました！）"
          name="comment"
          object={comment}
          onChange={event => {
            setComment(event.target.value);
          }}
        />
      </StyledDiv>
    );
  }
}
