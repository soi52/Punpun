import React from 'react';
import styled from 'styled-components';
import useScrollFadeInPage from '../../pages/owner/useScrollFadeInPage';
import fifth from '../../resources/images/5.jpg';

const ComponentStyle = styled.div`
  background: url(${fifth}) no-repeat center;
  background-size: cover;
  background-color: purple;
  height: 100%;
  width: 100%;
  display: flex;
`;
const TitleStyle = styled.h2`
  margin: auto;
  text-align: center;
`;
const ThumbImage = styled.img`
  background: url(${fifth}) no-repeat center
  width: 50%;
  height: 50%;
`;

function FifthComponent() {
  const { ref: ref4, style: style4 } = useScrollFadeInPage({
    direction: 'up',
    duration: 1,
    delay: 0,
  });
  return (
    <ComponentStyle>
      <div ref={ref4} style={{ ...style4, opacity: 1 }}>
        <TitleStyle>Fifth Component</TitleStyle>
      </div>
    </ComponentStyle>
  );
}

export default FifthComponent;
