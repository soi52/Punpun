import React from 'react';
import styled from 'styled-components';
import useScrollFadeInPage from '../owner/useScrollFadeInPage';
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
  const { ref: ref3, style: style3 } = useScrollFadeInPage({
    direction: 'up',
    duration: 1,
    delay: 0,
  });
  return (
    <ComponentStyle>
      <div ref={ref3} style={{ ...style3, opacity: 1 }}>
        <TitleStyle>Fourth Component</TitleStyle>
      </div>
    </ComponentStyle>
  );
}

export default FourthComponent;
