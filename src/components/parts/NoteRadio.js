import React, { Component } from 'react';
import { Button, Col } from 'reactstrap';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { setPaletteNote } from '../../actions/palette';

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
      <Col xs={colSize} className="btn-group-toggle" style={{ padding: '3px' }}>
        <StyledButton
          block
          color={this.props.color}
          active={this.props.note === this.props.value}
          onClick={() => {
            this.props.setPaletteNote(this.props.value);
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

const mapStateToProps = state => ({
  note: state.palette.note,
  paletteWidth: state.ide.palette.width,
});
const mapDispatchToProps = dispatch => ({
  setPaletteNote(note) {
    dispatch(setPaletteNote(note));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteRadio);
