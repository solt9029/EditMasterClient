import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  text-align: center;
`;

const StyledRow = styled(Row)`
  margin-top: 100px;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
`;

const StyledCol = styled(Col)`
  margin-bottom: 60px;
`;

const CommentBox = styled.div`
  margin-top: 15px;
`;

const CommentText = styled.p`
  margin-bottom: 3px;
`;

export default class Jumbotron extends Component {
  render() {
    return (
      <StyledContainer fluid>
        <StyledRow>
          <Col xs={12}>
            <h2>創作譜面支援アプリケーション</h2>
            <h2>『創作の達人』</h2>
            <div>
              <p>
                "創作の達人"は好みのYouTubeの楽曲から太鼓の譜面を創作できるアプリです。
              </p>
            </div>
          </Col>
        </StyledRow>
        <StyledRow>
          <StyledCol xs={12} sm={6} md={3}>
            <Subtitle>すぐに始められる</Subtitle>
            <img src="/images/1.png" width="100%" alt="start" />
            <CommentBox>
              <CommentText>曲の準備はYouTube動画IDの入力だけ。</CommentText>
              <CommentText>曲ファイルの準備は必要なし。</CommentText>
            </CommentBox>
          </StyledCol>
          <StyledCol xs={12} sm={6} md={3}>
            <Subtitle>簡単に創作できる</Subtitle>
            <img src="/images/2.png" width="100%" alt="create" />
            <CommentBox>
              <CommentText>クリックだけでノーツを配置。</CommentText>
              <CommentText>直感的に創作譜面。</CommentText>
            </CommentBox>
          </StyledCol>
          <StyledCol xs={12} sm={6} md={3}>
            <Subtitle>その場で遊べる</Subtitle>
            <img src="/images/3.png" width="100%" alt="play" />
            <CommentBox>
              <CommentText>プレイモードで遊ぼう。</CommentText>
              <CommentText>太鼓さん次郎への変換も。</CommentText>
            </CommentBox>
          </StyledCol>
          <StyledCol xs={12} sm={6} md={3}>
            <Subtitle>みんなと共有できる</Subtitle>
            <img src="/images/4.png" width="100%" alt="share" />
            <CommentBox>
              <CommentText>創作譜面は保存・共有。</CommentText>
              <CommentText>みんなの譜面も見てみよう。</CommentText>
            </CommentBox>
          </StyledCol>
        </StyledRow>
        <Row style={{ marginTop: '40px' }}>
          <Col xs={12}>
            <h2>さあ、始めよう。次世代の創作譜面。</h2>
          </Col>
        </Row>
      </StyledContainer>
    );
  }
}
