import React, { Component } from 'react';
import { Button, Col } from 'reactstrap';
import { connect } from 'react-redux';

class NoteRadio extends Component {
  render() {
    return (
      <Button
        tag="label"
        color="primary"
        active={this.props.note === this.props.input.value}
      >
        <input {...this.props.input} type={this.props.type} />
        {this.props.label}
      </Button>
    );
  }
}

const mapStateToProps = state => ({
  note: state.form.palette.values.note,
});
export default connect(
  mapStateToProps,
  null
)(NoteRadio);
