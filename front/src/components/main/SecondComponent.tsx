import React from 'react';
import styled from 'styled-components';
import main2 from '../../resources/images/main/main2-1.png';
import second from '../../resources/images/main2.png';
import { Fade } from 'react-awesome-reveal';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

const ComponentStyle = styled.div`
  background-size: 100%;
  display: flex;
  // position: relative;
`;

const ContentStyle = styled.div`
  // position: absolute;
  margin-top: 75px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  // height: 100%;
`;

const ImageDiv = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  margin-top: 200px;
  margin-left: 50%;
  text-align: center;
`;

function SecondComponent() {
  const { width, height } = useWindowSize();
  return (
    <ComponentStyle>
      <Confetti width={width} height={height} />
      <Fade duration={2000} direction="left">
        {<ContentStyle>냠</ContentStyle>}
      </Fade>
      <Fade duration={2000} direction="down">
        {
          <ImageDiv>
            <img src={main2} style={{ width: '106%', height: '100%' }} />
          </ImageDiv>
        }
      </Fade>
    </ComponentStyle>
  );
}
export default SecondComponent;
