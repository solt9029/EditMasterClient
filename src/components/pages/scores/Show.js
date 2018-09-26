import React, { Component } from 'react';
import Navbar from '../../parts/Navbar';
import IDE from '../../parts/IDE';

export default class Show extends Component {
  componentDidMount() {
    // axios here
  }
  render() {
    return (
      <div>
        <Navbar active="scoresNew" />
        <IDE />
      </div>
    );
  }
}
