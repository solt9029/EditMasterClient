import React from 'react';
import { Col } from 'reactstrap';
import styled from 'styled-components';

const Title = styled.h2`
  font-size: 1.5rem;
`;

const Box = styled(Col)`
  margin-bottom: 60px;
`;

const Body = styled.div`
  margin-top: 15px;
`;

const DescriptionBox = ({ title, children, src, alt }) => {
  return (
    <Box xs={12} sm={6} md={3}>
      <Title>{title}</Title>
      <img src={src} width="100%" alt={alt} />
      <Body>{children}</Body>
    </Box>
  );
};

export default DescriptionBox;
