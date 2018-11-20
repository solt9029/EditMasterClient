import React from 'react';
import { Row, Container } from 'reactstrap';
import styled from 'styled-components';
import DivisionButton from '../containers/DivisionButton';
import { numbers } from '../constants/';

const StyledContainer = styled(Container)`
  margin-bottom: 30px;
`;

const DivisionButtonList = () => {
  return (
    <StyledContainer>
      <Row>
        {numbers.DIVISIONS.map((value, i) => {
          return <DivisionButton value={value} key={i} />;
        })}
      </Row>
    </StyledContainer>
  );
};

export default DivisionButtonList;
