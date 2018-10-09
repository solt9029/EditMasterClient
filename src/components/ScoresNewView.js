import React, { Component } from 'react';
import Navbar from './parts/Navbar';
import IDE from './parts/IDE';
import Modal from './parts/Modal';

export default class ScoresNewView extends Component {
  componentDidMount() {
    this.props.setDefaultScore();
  }
  render() {
    return (
      <div>
        <Navbar />
        <IDE />
        <Modal />
      </div>
    );
  }
}
