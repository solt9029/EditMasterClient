import styled from 'styled-components';

export default styled.div`
  background-color: #222;
  color: white;
  font-weight: 500;
  padding: ${({ padding }) => padding}px;
  height: ${({ height }) => height}%;
`;
