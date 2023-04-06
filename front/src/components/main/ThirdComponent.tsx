import React from 'react';
import styled from 'styled-components';
import third from '../../resources/images/3.jpg';
import video1 from '../../resources/video/video.mp4';
import video2 from '../../resources/video/video2.mp4';
import Carousel from './Carousel';

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
      {/* <video autoPlay loop controls={false}>
        <source src={video2} type="video/mp4" />
      </video> */}
      {/* <video autoPlay loop muted>
          <source src={video1} type="video/mp4" />
      </video> */}
      <Carousel/>
    </ComponentStyle>
  );
}

export default ThirdComponent;
