import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledSlider = styled(Slider)`
  && {
    width: 95%;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    margin: auto;
  }
`;

const PlayerSlider = ({
  ytPlayer,
  setIsSliderChanging,
  setCurrentTime,
  currentTime,
}) => {
  const max = ytPlayer ? ytPlayer.getDuration() : 0;
  const onChange = value => {
    setIsSliderChanging(true);
    setCurrentTime(value);
  };
  const onAfterChange = () => {
    if (ytPlayer) {
      ytPlayer.seekTo(currentTime);
    }
    setIsSliderChanging(false);
  };

  return (
    <StyledSlider
      min={0}
      max={max}
      value={currentTime}
      onChange={onChange}
      onAfterChange={onAfterChange}
    />
  );
};

export default PlayerSlider;

PlayerSlider.propTypes = {
  ytPlayer: PropTypes.object,
  setIsSliderChanging: PropTypes.func.isRequired,
  setCurrentTime: PropTypes.func.isRequired,
  currentTime: PropTypes.number.isRequired,
};
