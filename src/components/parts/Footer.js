import React, { Component } from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  text-align: center;
  padding: 10px;
  background: linear-gradient(
    45deg,
    rgba(20, 160, 140, 0.9),
    rgba(70, 150, 180, 0.8)
  );
  color: #fff;
`;

export default class Footer extends Component {
  render() {
    return (
      <StyledContainer fluid>
        <small>Copyright © Kenshi Shiode. All Rights Reserved.</small>
      </StyledContainer>
    );
  }
}
