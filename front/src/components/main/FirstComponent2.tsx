import styled from 'styled-components';
import first from '../../resources/images/main16.png';
import { Fade } from 'react-awesome-reveal';

const ComponentStyle = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #fdf4f5;
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
`;

const ContentStyle = styled.h4`
  width: 50%;
`;

function FirstComponent2() {
  return (
    <ComponentStyle>
      <ContentDivStyle>
        <Fade duration={1500} direction={'left'}>
          <TitleStyle>메뉴를 골라 후원하고</TitleStyle>
          <TitleStyle>식사를 마친 아동이 남긴</TitleStyle>
          <TitleStyle>감사메세지를 읽어보세요.</TitleStyle>
        </Fade>
      </ContentDivStyle>
      <MainImageStyle src={first} />
      {/* <Fade duration={1500} direction={'right'}> */}
      {/* </Fade> */}
    </ComponentStyle>
  );
}

export default FirstComponent2;
