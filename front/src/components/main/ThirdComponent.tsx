import React from 'react';
import styled from 'styled-components';
import third from '../../resources/images/3.jpg';
import video1 from '../../resources/video/video.mp4';
import video2 from '../../resources/video/video2.mp4';
import Carousel from './Carousel';
import { Fade } from 'react-awesome-reveal';

const ComponentStyle = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TitleStyle = styled.h2`
  margin: auto;
  text-align: center;
`;

const Div = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;

const H2 = styled.h2`
  font-size: 4rem;
  // margin: auto;
  font-family: GmarketSansMedium, sans-serif, Arial;
  color: #726ea0;
  cursor: pointer;
  &:hover,
  &:focus {
    color: white;
    background-color: #726ea0;
  }
`;

const CarouselDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  width: 70%;
`;

function ThirdComponent() {
  return (
    <ComponentStyle>
      {/* <video autoPlay loop controls={false}>
        <source src={video2} type="video/mp4" />
      </video> */}
      {/* <video autoPlay loop muted>
          <source src={video1} type="video/mp4" />
      </video> */}
      <Div>
        <Fade duration={2000} direction="down">
          <H2>푼푼은 이렇게 진행돼요!</H2>
        </Fade>
      </Div>
      <CarouselDiv>
        <Carousel />
      </CarouselDiv>
    </ComponentStyle>
  );
}

export default ThirdComponent;
