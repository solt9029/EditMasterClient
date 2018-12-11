import React from 'react';
import { CardHeader, CardBody, CardText } from 'reactstrap';
import Card from '../styled/Card';
import PropTypes from 'prop-types';

const NewsCard = ({ date, type, title, children }) => (
  <Card>
    <CardHeader>
      {type}： {title} （{date}）
    </CardHeader>
    <CardBody>
      <CardText>{children}</CardText>
    </CardBody>
  </Card>
);

export default NewsCard;

NewsCard.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

NewsCard.defaultProps = {
  type: '更新情報',
};
