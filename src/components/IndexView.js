import React from 'react';
import Navbar from './Navbar';
import Jumbotron from './Jumbotron';
import Footer from './Footer';
import Description from './Description';
import News from './News';

const IndexView = () => (
  <div>
    <Navbar />
    <Jumbotron />
    <Description />
    <News />
    <Footer />
  </div>
);

export default IndexView;
