import React, { Fragment } from 'react';
import { normalizeVideoId } from '../utils/url';
import ConfigForm from './ConfigForm';
import PropTypes from 'prop-types';

const Config = ({
  setUsername,
  setVideoId,
  fetchSongle,
  setBpm,
  setOffset,
  setSpeed,
  setComment,
  username,
  videoId,
  bpm,
  offset,
  speed,
  comment,
}) => {
  const onUsernameChange = event => setUsername(event.target.value);
  const onVideoIdChange = event => {
    const videoId = normalizeVideoId(event.target.value);
    setVideoId(videoId);
    fetchSongle(videoId);
  };
  const onBpmChange = event => setBpm(event.target.value);
  const onOffsetChange = event => setOffset(event.target.value);
  const onSpeedChange = event => setSpeed(event.target.value);
  const onCommentChange = event => setComment(event.target.value);

  return (
    <Fragment>
      <ConfigForm
        label="ユーザ名"
        type="text"
        placeholder="ユーザ名（例：通りすがりの創作の達人）"
        name="username"
        form={username}
        onChange={onUsernameChange}
      />
      <ConfigForm
        label="YouTube動画ID"
        type="text"
        placeholder="YouTube動画ID（例：PqJNc9KVIZE）"
        name="videoId"
        form={videoId}
        onChange={onVideoIdChange}
      />
      <ConfigForm
        label="BPM"
        type="number"
        placeholder="BPM（例：200）"
        name="bpm"
        form={bpm}
        onChange={onBpmChange}
      />
      <ConfigForm
        label="OFFSET：曲の始まる時間（秒）"
        type="number"
        placeholder="OFFSET（例：1.5）"
        name="offset"
        form={offset}
        onChange={onOffsetChange}
      />
      <ConfigForm
        label="倍速"
        type="number"
        placeholder="倍速（例：2）"
        name="speed"
        form={speed}
        onChange={onSpeedChange}
      />
      <ConfigForm
        label="コメント"
        type="text"
        placeholder="コメント（例：創作の達人で創作譜面をしました！）"
        name="comment"
        form={comment}
        onChange={onCommentChange}
      />
    </Fragment>
  );
};

export default Config;

Config.propTypes = {
  setUsername: PropTypes.func.isRequired,
  setVideoId: PropTypes.func.isRequired,
  setBpm: PropTypes.func.isRequired,
  setOffset: PropTypes.func.isRequired,
  setSpeed: PropTypes.func.isRequired,
  setComment: PropTypes.func.isRequired,
  fetchSongle: PropTypes.func.isRequired,
};
