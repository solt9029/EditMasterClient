import React from 'react';
import PlayerJudgeMarkCanvas from '../containers/PlayerJudgeMarkCanvas';
import PlayerNotesCanvas from '../containers/PlayerNotesCanvas';
import PlayerShotsCanvas from '../containers/PlayerShotsCanvas';
import PlayerJudgeEffectsCanvas from '../containers/PlayerJudgeEffectsCanvas';
import PlayerFireworkEffectsCanvas from '../containers/PlayerFireworkEffectsCanvas';
import PlayerBackgroundEffectsCanvas from '../containers/PlayerBackgroundEffectsCanvas';
import PlayerSlider from '../containers/PlayerSlider';
import PropTypes from 'prop-types';

const Player = ({ doPlayMode }) => (
  <div onKeyDown={doPlayMode} tabIndex={0}>
    <PlayerBackgroundEffectsCanvas />
    <PlayerJudgeMarkCanvas />
    <PlayerNotesCanvas />
    <PlayerShotsCanvas />
    <PlayerFireworkEffectsCanvas />
    <PlayerJudgeEffectsCanvas />
    <PlayerSlider />
  </div>
);

export default Player;

Player.propTypes = {
  doPlayMode: PropTypes.func.isRequired,
};
