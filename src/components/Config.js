import React, { Component } from 'react';
import styled from 'styled-components';
import * as utils from '../utils';
import ConfigForm from './ConfigForm';
import propTypes from 'prop-types';

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
    const { props } = this;
    const { config } = props;

    return (
      <StyledDiv>
        <ConfigForm
          label="ユーザ名"
          type="text"
          placeholder="ユーザ名（例：通りすがりの創作の達人）"
          name="username"
          object={config.username}
          onChange={event => {
            props.setUsername(event.target.value);
          }}
        />
        <ConfigForm
          label="YouTube動画ID"
          type="text"
          placeholder="YouTube動画ID（例：PqJNc9KVIZE）"
          name="videoId"
          object={config.videoId}
          onChange={event => {
            const videoId = utils.urls.getVideoId(event.target.value);
            props.setVideoId(videoId);
            props.fetchSongle(videoId);
          }}
        />
        <ConfigForm
          label="BPM"
          type="number"
          placeholder="BPM（例：200）"
          name="bpm"
          object={config.bpm}
          onChange={event => {
            props.setBpm(event.target.value);
          }}
        />
        <ConfigForm
          label="OFFSET：曲の始まる時間（秒）"
          type="number"
          placeholder="OFFSET（例：1.5）"
          name="offset"
          object={config.offset}
          onChange={event => {
            props.setOffset(event.target.value);
          }}
        />
        <ConfigForm
          label="倍速"
          type="number"
          placeholder="倍速（例：2）"
          name="speed"
          object={config.speed}
          onChange={event => {
            props.setSpeed(event.target.value);
          }}
        />
        <ConfigForm
          label="コメント"
          type="text"
          placeholder="コメント（例：創作の達人で創作譜面をしました！）"
          name="comment"
          object={config.comment}
          onChange={event => {
            props.setComment(event.target.value);
          }}
        />
      </StyledDiv>
    );
  }
}

Config.propTypes = {
  config: propTypes.shape({
    username: propTypes.object,
    videoId: propTypes.object,
    bpm: propTypes.object,
    offset: propTypes.object,
    speed: propTypes.object,
    comment: propTypes.object,
  }),
  setUsername: propTypes.func,
  setVideoId: propTypes.func,
  setBpm: propTypes.func,
  setOffset: propTypes.func,
  setSpeed: propTypes.func,
  setComment: propTypes.func,
  reset: propTypes.func,
  fetchSongle: propTypes.func,
};
