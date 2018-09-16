import React, { Component } from 'react';
import { Button, Col } from 'reactstrap';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  min-width: 75px;
`;

class DivisionRadio extends Component {
  render() {
    // recalculate col size
    let colSize = 3;
    if (this.props.paletteWidth < 200) {
      colSize = 12;
    } else if (this.props.paletteWidth < 400) {
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
          color="light"
          active={this.props.division === this.props.input.value}
        >
          <div>{this.props.input.value}</div>
          <input {...this.props.input} type={this.props.type} />
        </StyledButton>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  division: state.form.palette.values.division,
  paletteWidth: state.pane.palette.width,
});
export default connect(
  mapStateToProps,
  null
)(DivisionRadio);
