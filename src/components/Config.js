import React, { Component, Fragment } from 'react';
import { normalizeVideoId } from '../utils/url';
import ConfigForm from './ConfigForm';
import propTypes from 'prop-types';

export default class Config extends Component {
  render() {
    const { props } = this;

    return (
      <Fragment>
        <ConfigForm
          label="ユーザ名"
          type="text"
          placeholder="ユーザ名（例：通りすがりの創作の達人）"
          name="username"
          object={props.username}
          onChange={event => {
            props.setUsername(event.target.value);
          }}
        />
        <ConfigForm
          label="YouTube動画ID"
          type="text"
          placeholder="YouTube動画ID（例：PqJNc9KVIZE）"
          name="videoId"
          object={props.videoId}
          onChange={event => {
            const videoId = normalizeVideoId(event.target.value);
            props.setVideoId(videoId);
            props.fetchSongle(videoId);
          }}
        />
        <ConfigForm
          label="BPM"
          type="number"
          placeholder="BPM（例：200）"
          name="bpm"
          object={props.bpm}
          onChange={event => {
            props.setBpm(event.target.value);
          }}
        />
        <ConfigForm
          label="OFFSET：曲の始まる時間（秒）"
          type="number"
          placeholder="OFFSET（例：1.5）"
          name="offset"
          object={props.offset}
          onChange={event => {
            props.setOffset(event.target.value);
          }}
        />
        <ConfigForm
          label="倍速"
          type="number"
          placeholder="倍速（例：2）"
          name="speed"
          object={props.speed}
          onChange={event => {
            props.setSpeed(event.target.value);
          }}
        />
        <ConfigForm
          label="コメント"
          type="text"
          placeholder="コメント（例：創作の達人で創作譜面をしました！）"
          name="comment"
          object={props.comment}
          onChange={event => {
            props.setComment(event.target.value);
          }}
        />
      </Fragment>
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
