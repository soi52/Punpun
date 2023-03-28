import React from 'react';
import { Fade } from 'react-awesome-reveal';
import styled from 'styled-components';
import fourth from '../../resources/images/4.jpg';

const ComponentStyle = styled.div`
  background: url(${fourth}) no-repeat center;
  background-size: cover;
  background-color: yellow;
  height: 100%;
  width: 100%;
  display: flex;
`;

const TitleStyle = styled.h2`
  margin: auto;
  text-align: center;
`;

function FourthComponent() {
  return (
    <ComponentStyle>
      <Fade duration={1000} direction={'up'}>
        <TitleStyle>Fourth Component</TitleStyle>
      </Fade>
    </ComponentStyle>
  );
}

export default FourthComponent;
