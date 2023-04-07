import styled from 'styled-components';
import first from '../../resources/images/main15.png';
import { Fade } from 'react-awesome-reveal';

const ComponentStyle = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #daf5ff;
  align-items: center;
`;

const MainImageStyle = styled.img`
  width: 50%;
  height: 65%;
  object-fit: cover;
  margin-right: 50px;
`;

const ContentDivStyle = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background-color: #ddf3ff;
`;

const TitleStyle = styled.h1`
  width: 100%;
  font-family: GmarketSansMedium, sans-serif, Arial;
`;

const ContentStyle = styled.h4`
  width: 50%;
`;

function FirstComponent1() {
  return (
    <ComponentStyle>
      <MainImageStyle src={first} />
      <ContentDivStyle>
        <Fade duration={1500} direction={'right'}>
          <TitleStyle>결식아동들을 위해</TitleStyle>
          <TitleStyle>항상 후원하는 가게로</TitleStyle>
          <TitleStyle>설정해보세요</TitleStyle>
        </Fade>
      </ContentDivStyle>
      {/* <Fade duration={1500} direction={'right'}> */}
      {/* </Fade> */}
    </ComponentStyle>
  );
}

export default FirstComponent1;
