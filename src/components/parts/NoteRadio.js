import React, { Component } from 'react';
import { Button, Col, CardImg } from 'reactstrap';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  min-width: 75px;
`;

class NoteRadio extends Component {
  render() {
    return (
      <Col
        lg={3}
        xs={6}
        className="btn-group-toggle"
        style={{ padding: '3px' }}
      >
        <StyledButton
          block
          tag="label"
          color={this.props.color}
          active={this.props.note === this.props.input.value}
        >
          <div>{this.props.label}</div>
          <img src={this.props.img} width="100%" height="auto" />

          <input {...this.props.input} type={this.props.type} />
        </StyledButton>
      </Col>
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
