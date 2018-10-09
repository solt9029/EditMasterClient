import React from 'react';
import styled from 'styled-components';
import Navbar from './parts/Navbar';
import { Container } from 'reactstrap';
import Footer from './parts/Footer';

const Icon = styled.img`
  width: 25%;
  min-width: 150px;
  margin-top: 20px;
  opacity: 0.5;
`;

const StyledContainer = styled(Container)`
  text-align: center;
`;

const StyledText = styled.p`
  font-size: 1.2em;
`;

const NotFoundView = () => (
  <div>
    <Navbar notFound />
    <StyledContainer>
      <Icon src="/images/icon.png" />
      <StyledText>お探しのページは存在しません</StyledText>
    </StyledContainer>
    <Footer />
  </div>
);

export default NotFoundView;
