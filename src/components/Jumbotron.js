import React, { Component } from 'react';
import {
  Jumbotron as ReactstrapJumbotron,
  Container,
  Button,
} from 'reactstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledJumbotron = styled(ReactstrapJumbotron)`
  background: linear-gradient(
      45deg,
      rgba(20, 160, 140, 0.9),
      rgba(70, 150, 180, 0.8)
    ),
    url('/images/header.jpg') center no-repeat;
  background-size: cover;
  text-align: center;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 3.9em;
  margin-top: 50px;
  margin-bottom: 50px;
  font-weight: bold;
`;

const Subtitle = styled.div`
  color: #fff;
  margin-top: 50px;
  margin-bottom: 40px;
  font-size: 1em;
`;

const StyledButton = styled(Button)`
  width: 9.5em;
  margin: 15px;
`;

const ButtonText = styled.span`
  font-size: 0.9em;
  font-weight: 500;
  color: #fff;
`;

export default class Jumbotron extends Component {
  render() {
    return (
      <StyledJumbotron>
        <Container>
          <Title>さあ、創作譜面を始めよう</Title>
          <Subtitle>
            <p>
              誰もが知っている太鼓ゲーム。実は譜面を叩くだけでなく、創作譜面も面白い。
            </p>
            <p>
              "創作の達人"でオリジナルの譜面を創作しよう。誰でも簡単に始められる、創作譜面支援アプリ。
            </p>
          </Subtitle>
          <StyledButton color="primary" size="lg" tag={Link} to="/scores/new">
            <ButtonText>創作譜面を始める</ButtonText>
          </StyledButton>
          <StyledButton color="warning" size="lg" tag={Link} to="/scores">
            <ButtonText>作品一覧を見る</ButtonText>
          </StyledButton>
        </Container>
      </StyledJumbotron>
    );
  }
}
