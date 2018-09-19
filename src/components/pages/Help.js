import React from 'react';
import Navbar from '../parts/Navbar';
import Footer from '../parts/Footer';
import { Card, CardHeader, CardBlock, CardText, Container } from 'reactstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin-top: 50px;
`;

const StyledCard = styled(Card)`
  margin-top: 15px;
  margin-bottom: 15px;
`;

const Help = () => (
  <div>
    <Navbar active="help" />
    <StyledContainer>
      <StyledCard>
        <CardHeader>どうやって再生するの？</CardHeader>
        <CardBlock>
          <CardText>
            ・YouTubeの動画IDとBPMとOFFSETがフォームに入力されていることを確認してください。
          </CardText>
          <CardText>
            ・YouTubeの動画を再生すると、それに合わせて譜面が再生されます。
          </CardText>
        </CardBlock>
      </StyledCard>
    </StyledContainer>
    <Footer />
  </div>
);

export default Help;
