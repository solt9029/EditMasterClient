import React from 'react';
import Jumbotron from '../components/Jumbotron';
import Footer from '../components/Footer';
import Description from '../components/Description';
import NewsCardList from '../components/NewsCardList';
import Container from '../styled/Container';

const Index = () => (
  <div>
    <Jumbotron />
    <Description />
    <Container top={100}>
      <NewsCardList />
    </Container>
    <Footer />
  </div>
);

export default Index;
