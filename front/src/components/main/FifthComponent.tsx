import React from 'react';
import styled from 'styled-components';
import fifth from '../../resources/images/5.jpg';
import icon4 from '../../resources/images/4remove.png';
import icon5 from '../../resources/images/5remove.png';
import thumb from '../../resources/images/thumb.png';
import { Fade } from 'react-awesome-reveal';

const ComponentStyle = styled.div`
  // background: url(${fifth}) no-repeat center;
  // background-size: cover;
  background-color: #efcee1;
  height: 100%;
  width: 100%;
  display: flex;
`;
const ContentStyle = styled.div`
  margin: auto;
  text-align: center;
  display: flex;
`;
const ThumbImage = styled.img`
  background: url(${fifth}) no-repeat center
  width: 50%;
  height: 50%;
`;

function FifthComponent() {
  return (
    <ComponentStyle>
      <ContentStyle>
        <Fade duration={2000} direction={'up'}>
          <img
            src={icon4}
            alt="icon4"
            style={{ width: '100%', height: '100%' }}
          />
          <img
            src={icon5}
            alt="icon5"
            style={{ width: '100%', height: '100%' }}
          />
          <img
            src={thumb}
            alt="thumb"
            style={{ width: '100%', height: '100%' }}
          />
        </Fade>
      </ContentStyle>
    </ComponentStyle>
  );
}

export default FifthComponent;
