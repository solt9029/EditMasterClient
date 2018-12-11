import React, { Fragment } from 'react';
import { Button, Row } from 'reactstrap';
import styled from 'styled-components';
import NoteButtonList from '../containers/NoteButtonList';
import DivisionButtonList from '../containers/DivisionButtonList';
import Container from '../styled/Container';

const BarButton = styled(Button)`
  min-width: 90px;
`;

const ModeButton = styled(Button)`
  margin-bottom: 30px;
  min-width: 180px;
`;

const Palette = ({ toggleMode, isAutoMode, width, addBar, removeBar }) => {
  const onModeButtonClick = () => toggleMode();
  const onAddBarButtonClick = () => addBar();
  const onRemoveBarButtonClick = () => removeBar();

  return (
    <Fragment>
      <ModeButton
        block
        color={isAutoMode ? 'danger' : 'primary'}
        onClick={onModeButtonClick}
      >
        {isAutoMode ? 'プレイモードにする' : 'オート再生にする'}
      </ModeButton>
      <label>譜面の種類</label>
      <Container bottom={30}>
        <Row>
          <NoteButtonList width={width} />
        </Row>
      </Container>
      <label>1小節あたりの分割数</label>
      <Container bottom={30}>
        <Row>
          <DivisionButtonList width={width} />
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
