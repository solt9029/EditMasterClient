import React from 'react';
import { Card, CardHeader, CardBody, CardText, Container } from 'reactstrap';
import styled from 'styled-components';
import news from '../../news';

const StyledContainer = styled(Container)`
  margin-top: 100px;
`;

const StyledCard = styled(Card)`
  margin-top: 15px;
  margin-bottom: 15px;
`;

const News = () => (
  <StyledContainer>
    {news.map((value, i) => {
      return (
        <StyledCard key={i}>
          <CardHeader>{value.title}</CardHeader>
          <CardBody>
            <CardText>{value.content}</CardText>
          </CardBody>
        </StyledCard>
      );
    })}
  </StyledContainer>
);

export default News;
