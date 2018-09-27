import React, { Component } from 'react';
import axios from 'axios';

export default class ScoreCardList extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const result = await axios.get('http://localhost:8051/scores');
    console.log(result);
  }

  render() {
    return <div />;
  }
}
