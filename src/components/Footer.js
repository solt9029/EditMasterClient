import React from 'react';
import styled from 'styled-components';
import Container from '../styled/Container';

const StyledContainer = styled(Container)`
  padding: 10px;
  background: linear-gradient(
    45deg,
    rgba(20, 160, 140, 0.9),
    rgba(70, 150, 180, 0.8)
  );
  color: #fff;
`;

const Footer = () => {
  return (
    <StyledContainer fluid center={1} top={50}>
      <small>Copyright © Kenshi Shiode. All Rights Reserved.</small>
    </StyledContainer>
  );
};

export default Footer;
