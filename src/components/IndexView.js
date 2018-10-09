import React from 'react';
import Navbar from './parts/Navbar';
import Jumbotron from './parts/Jumbotron';
import Footer from './parts/Footer';
import Description from './parts/Description';
import News from './parts/News';

const Index = () => (
  <div>
    <Navbar />
    <Jumbotron />
    <Description />
    <News />
    <Footer />
  </div>
);

export default Index;
