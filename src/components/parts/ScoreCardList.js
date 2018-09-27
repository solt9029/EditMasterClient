import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class ScoreCardList extends Component {
  render() {
    return (
      <Fragment>
        {this.props.data.map((score, i) => {
          return <div key={i}>{score.speed} </div>;
        })}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  data: state.score.data,
});
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreCardList);
