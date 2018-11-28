import styled from 'styled-components';
import { Container } from 'reactstrap';

export default styled(Container)`
  margin-top: ${({ top }) => top}px;
  margin-bottom: ${({ bottom }) => bottom}px;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
`;
