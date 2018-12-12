import React, { Component } from 'react';
import EditorCaretCanvas from '../containers/EditorCaretCanvas';
import EditorCurrentTimeMarkCanvas from '../containers/EditorCurrentTimeMarkCanvas';
import EditorBarsCanvas from '../containers/EditorBarsCanvas';
import EditorNotesCanvas from '../containers/EditorNotesCanvas';
import PropTypes from 'prop-types';
import { Keys } from '../constants';
import styled from 'styled-components';
import { calcEditorCanvasHeight } from '../utils/calculations';
import { debounce } from 'lodash';

const Div = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

const ScrollContainer = styled(Div)`
  overflow: auto;
`;

const LargeContainer = styled(Div)`
  overflow: hidden;
`;

const Stage = styled.div`
  position: relative;
  outline: none;
`;

export default class Editor extends Component {
  ref = React.createRef();

  onScroll = debounce(() => {
    const { scrollTop } = this.ref.current;
    this.props.setScroll(scrollTop);
  }, 50);

  componentDidMount() {
    this.ref.current.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    this.ref.current.removeEventListener('scroll', this.onScroll);
  }

  onClick = () => this.props.updateNotes();

  onMouseMove = event => {
    const { offsetX, offsetY } = event.nativeEvent;
    const { setCaret, scroll } = this.props;
    setCaret({ offsetX, offsetY: offsetY + scroll });
  };

  onKeyDown = event => {
    const { updateNotes, copy, paste } = this.props;
    const { key } = event.nativeEvent;
    updateNotes(key);
    if (key === Keys.COPY) {
      copy();
    } else if (key === Keys.PASTE) {
      paste();
    }
  };

  render() {
    const { notesLength, width, height } = this.props;
    const largeHeight = calcEditorCanvasHeight(notesLength);

    return (
      <ScrollContainer width={width} height={height} innerRef={this.ref}>
        <LargeContainer width={width} height={largeHeight}>
          <Stage
            tabIndex={0}
            onMouseMove={this.onMouseMove}
            onKeyDown={this.onKeyDown}
            onClick={this.onClick}
          >
            <EditorBarsCanvas />
            <EditorNotesCanvas />
            <EditorCurrentTimeMarkCanvas />
            <EditorCaretCanvas />
          </Stage>
        </LargeContainer>
      </ScrollContainer>
    );
  }
}

Editor.propTypes = {
  updateNotes: PropTypes.func.isRequired,
  setCaret: PropTypes.func.isRequired,
  copy: PropTypes.func.isRequired,
  paste: PropTypes.func.isRequired,
};
