import React, { Component } from 'react';
import Navbar from '../containers/Navbar';
import IDE from '../containers/IDE';
import Modal from '../containers/Modal';

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
