import React from 'react';
import Jumbotron from './Jumbotron';
import Footer from './Footer';
import Description from './Description';
import News from './News';

const IndexView = () => (
  <div>
    <Jumbotron />
    <Description />
    <News />
    <Footer />
  </div>
);

export default IndexView;
