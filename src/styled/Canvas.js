import styled from 'styled-components';

export default styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  outline: none;
  transform: translateY(${({ translateY }) => translateY}px);
  overflow: hidden;
`;
