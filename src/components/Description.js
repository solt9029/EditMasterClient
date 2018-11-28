import React from 'react';
import { Col } from 'reactstrap';
import Container from '../styled/Container';
import Row from '../styled/Row';
import DescriptionBoxList from './DescriptionBoxList';

const Description = () => {
  return (
    <Container center={1} fluid>
      <Row top={100}>
        <Col xs={12}>
          <h2>創作譜面支援アプリケーション</h2>
          <h2>『創作の達人』</h2>
          <div>
            <p>
              "創作の達人"は好みのYouTubeの楽曲から太鼓の譜面を創作できるアプリです。
            </p>
          </div>
        </Col>
      </Row>
      <Row top={100}>
        <DescriptionBoxList />
      </Row>
      <Row top={40}>
        <Col xs={12}>
          <h2>さあ、始めよう。次世代の創作譜面。</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default Description;
