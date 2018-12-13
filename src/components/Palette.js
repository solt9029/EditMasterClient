import React, { Fragment } from 'react';
import { Button, Row } from 'reactstrap';
import styled from 'styled-components';
import NoteButtonList from '../containers/NoteButtonList';
import DivisionButtonList from '../containers/DivisionButtonList';
import Container from '../styled/Container';
import ToggleButton from 'react-toggle-button';

const BarButton = styled(Button)`
  min-width: 90px;
`;

const PlayModeAlert = styled.span`
  padding-left: 7px;
  padding-top: 5px;
  color: #999;
  font-size: 0.8em;
`;

const Palette = ({ toggleMode, isAutoMode, addBar, removeBar }) => {
  const onToggle = () => toggleMode();
  const onAddBarButtonClick = () => addBar();
  const onRemoveBarButtonClick = () => removeBar();

  return (
    <Fragment>
      <label>オート再生</label>
      <Container bottom={30}>
        <Row>
          <ToggleButton value={isAutoMode} onToggle={onToggle} />
          <PlayModeAlert>
            {isAutoMode ? '' : '現在プレイモードになっています'}
          </PlayModeAlert>
        </Row>
      </Container>
      <label>譜面の種類</label>
      <Container bottom={30}>
        <Row>
          <NoteButtonList />
        </Row>
      </Container>
      <label>1小節あたりの分割数</label>
      <Container bottom={30}>
        <Row>
          <DivisionButtonList />
        </Row>
      </Container>
      <BarButton block color="success" onClick={onAddBarButtonClick}>
        行を追加
      </BarButton>
      <BarButton block color="danger" onClick={onRemoveBarButtonClick}>
        行を削除
      </BarButton>
    </Fragment>
  );
};

export default Palette;
