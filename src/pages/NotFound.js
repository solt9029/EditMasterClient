import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Container from '../styled/Container';

const Icon = styled.img`
  width: 25%;
  min-width: 150px;
  margin-top: 20px;
  opacity: 0.5;
`;

const Text = styled.p`
  font-size: 1.2em;
`;

const NotFound = () => (
  <div>
    <Container center>
      <Icon src="/images/icon.png" />
      <Text>お探しのページは存在しません</Text>
    </Container>
    <Footer />
  </div>
);

export default NotFound;
