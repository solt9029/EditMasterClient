import React, { Component } from 'react';
import { Button, Col } from 'reactstrap';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  min-width: 75px;
`;

const StyledImg = styled.img`
  width: 100%;
  height: auto;
`;

class NoteRadio extends Component {
  render() {
    // recalculate col size
    let colSize = 3;
    if (this.props.paletteWidth < 200) {
      colSize = 12;
    } else if (this.props.paletteWidth < 360) {
      colSize = 6;
    }

    return (
      <Col
        xs={colSize}
        className="btn-group-toggle"
        style={{ padding: '3px' }} // styled-components doesn't apply this style: used inline style
      >
        <StyledButton
          block
          tag="label"
          color={this.props.color}
          active={this.props.note === this.props.input.value}
        >
          <div>{this.props.label}</div>
          <StyledImg src={this.props.img} alt={this.props.img} />
          <input {...this.props.input} type={this.props.type} />
        </StyledButton>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  note: state.form.palette.values.note,
  paletteWidth: state.pane.palette.width,
});
export default connect(
  mapStateToProps,
  null
)(NoteRadio);
