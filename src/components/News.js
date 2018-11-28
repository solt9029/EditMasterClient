import React from 'react';
import { CardHeader, CardBody, CardText } from 'reactstrap';
import { news } from '../data';
import Container from '../styled/Container';
import Card from '../styled/Card';

const News = () => (
  <Container top={100}>
    {news.map((value, i) => {
      return (
        <Card key={i}>
          <CardHeader>{value.title}</CardHeader>
          <CardBody>
            <CardText>{value.content}</CardText>
          </CardBody>
        </Card>
      );
    })}
  </Container>
);

export default News;
