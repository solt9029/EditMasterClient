import React, { Component } from 'react';
import { Button, Col } from 'reactstrap';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  min-width: 75px;
`;

const StyledImg = styled.img`
  width: 100%;
  height: auto;
`;

export default class NoteButton extends Component {
  render() {
    // recalculate col size
    let colSize = 3;
    if (this.props.paletteWidth < 200) {
      colSize = 12;
    } else if (this.props.paletteWidth < 360) {
      colSize = 6;
    }

    return (
      <Col xs={colSize} className="btn-group-toggle" style={{ padding: '3px' }}>
        <StyledButton
          block
          color={this.props.color}
          active={this.props.note === this.props.value}
          onClick={() => {
            this.props.setNote(this.props.value);
          }}
        >
          <div>{this.props.label}</div>
          <StyledImg src={this.props.img} alt={this.props.img} />
          <input value={this.props.value} type="radio" />
        </StyledButton>
      </Col>
    );
  }
}
