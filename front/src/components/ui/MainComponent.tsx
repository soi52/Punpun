import React, { ReactNode } from 'react';
import styled from 'styled-components';

type MainComponentProps = {
  width: number;
  children: ReactNode;
};

const MainComponentStyle = styled.div<MainComponentProps>`
  background-color: white;
  border-radius: 1rem;
  width: ${(props) => props.width + 'rem'};
  height: 38rem;
  // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  float: left;
  overflow-y: auto;
  z-index: 5
`;

function MainComponent({ width, children }: MainComponentProps) {
  return <MainComponentStyle width={width}>{children}</MainComponentStyle>;
}

export default MainComponent;
