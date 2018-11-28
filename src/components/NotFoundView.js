import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Container from '../styled/Container';

const Icon = styled.img`
  width: 25%;
  min-width: 150px;
  margin-top: 20px;
  opacity: 0.5;
`;

const StyledText = styled.p`
  font-size: 1.2em;
`;

const NotFoundView = () => (
  <div>
    <Container center>
      <Icon src="/images/icon.png" />
      <StyledText>お探しのページは存在しません</StyledText>
    </Container>
    <Footer />
  </div>
);

export default NotFoundView;
