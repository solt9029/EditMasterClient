import React from 'react';
import Slider from '../styled/Slider';
import PlayerJudgeMarkCanvas from '../containers/PlayerJudgeMarkCanvas';
import PlayerNotesCanvas from '../containers/PlayerNotesCanvas';
import PlayerShotsCanvas from '../containers/PlayerShotsCanvas';
import PlayerJudgeEffectsCanvas from '../containers/PlayerJudgeEffectsCanvas';
import PlayerFireworkEffectsCanvas from '../containers/PlayerFireworkEffectsCanvas';
import PlayerBackgroundEffectsCanvas from '../containers/PlayerBackgroundEffectsCanvas';

const Player = ({
  ytPlayer,
  currentTime,
  setIsSliderChanging,
  setCurrentTime,
  doPlayMode,
}) => (
  <div onKeyDown={doPlayMode} tabIndex={0}>
    <PlayerBackgroundEffectsCanvas />
    <PlayerJudgeMarkCanvas />
    <PlayerNotesCanvas />
    <PlayerShotsCanvas />
    <PlayerFireworkEffectsCanvas />
    <PlayerJudgeEffectsCanvas />
    <Slider
      min={0}
      max={ytPlayer ? ytPlayer.getDuration() : 0}
      value={currentTime}
      onChange={value => {
        setIsSliderChanging(true);
        setCurrentTime(value);
      }}
      onAfterChange={() => {
        if (ytPlayer) {
          ytPlayer.seekTo(currentTime);
        }
        setIsSliderChanging(false);
      }}
    />
  </div>
);

export default Player;
