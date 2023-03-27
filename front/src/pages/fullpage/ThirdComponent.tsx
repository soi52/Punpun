import React from 'react';
import styled from 'styled-components';
import third from '../../resources/images/3.jpg';

const ComponentStyle = styled.div`
  background: url(${third}) no-repeat center;
  background-size: cover;
  height: 100%;
  width: 100%;
  display: flex;
`;

const TitleStyle = styled.h2`
  margin: auto;
  text-align: center;
`;

function ThirdComponent() {
  return (
    <ComponentStyle>
      <TitleStyle>Third Component</TitleStyle>
    </ComponentStyle>
  );
}

export default ThirdComponent;
