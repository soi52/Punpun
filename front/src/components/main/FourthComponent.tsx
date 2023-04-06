import styled from 'styled-components';
import first from '../../resources/images/main12.jpg';
import { Fade } from 'react-awesome-reveal';

const ComponentStyle = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: block;
  background-color: #a3c3f2;
`;

const MainImageStyle = styled.img`
  width: 100%;
  height: 54%;
  object-fit: cover;
`;

const ContentDivStyle = styled.div`
  height: 46%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TitleStyle = styled.text`
  font-size: 40px;
  font-weight: 600;
  width: 100%;
`;

const ContentStyle = styled.h4`
  width: 50%;
`;

function FourthComponent() {
  return (
    <ComponentStyle>
      <ContentDivStyle>
        <Fade duration={1500} direction={'down'}>
          <TitleStyle>'PUNPUN'의 가족이 되어주세요.</TitleStyle>
        </Fade>
      </ContentDivStyle>
      <MainImageStyle src={first} />
    </ComponentStyle>
  );
}

export default FourthComponent;
