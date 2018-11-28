import React from 'react';
import { Card, CardHeader, CardBody, CardText } from 'reactstrap';
import styled from 'styled-components';
import { news } from '../data';
import Container from '../styled/Container';

const StyledCard = styled(Card)`
  margin-top: 15px;
  margin-bottom: 15px;
`;

const News = () => (
  <Container top={100}>
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
  </Container>
);

export default News;
