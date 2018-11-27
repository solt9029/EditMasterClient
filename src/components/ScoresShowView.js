import React, { Component } from 'react';
import IDE from '../containers/IDE';
import NotFoundView from './NotFoundView';
import Modal from '../containers/Modal';

export default class ScoresShowView extends Component {
  componentDidMount() {
    this.props.fetch(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    let component = (
      <div>
        <IDE />
        <Modal />
      </div>
    );
    if (this.props.error) {
      component = <NotFoundView />;
    }

    return component;
  }
}
