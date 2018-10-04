import React, { Component } from 'react';
import { Button, Col } from 'reactstrap';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { setDivision } from '../../actions/palette';

const StyledButton = styled(Button)`
  min-width: 75px;
`;

class DivisionRadio extends Component {
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
          color="light"
          active={this.props.division === this.props.value}
          onClick={() => {
            this.props.setDivision(this.props.value);
          }}
        >
          <div>{this.props.value}</div>
          <input value={this.props.value} type="radio" />
        </StyledButton>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  division: state.palette.division,
  paletteWidth: state.ide.panes.palette.width,
});
const mapDispatchToProps = dispatch => ({
  setDivision(division) {
    dispatch(setDivision(division));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DivisionRadio);
