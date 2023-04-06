import styled from 'styled-components';
import first from '../../resources/images/main14.jpg';
import { Fade } from 'react-awesome-reveal';

const ComponentStyle = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
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
  // background-color: #a3c3f2;
`;

const TitleStyle = styled.h1`
  width: 100%;
`;

const ContentStyle = styled.h4`
  width: 50%;
`;

function FirstComponent() {
  return (
    <ComponentStyle>
      <ContentDivStyle>
        <Fade duration={1500} direction={'left'}>
          <TitleStyle>아이들이 행복한 세상을 만듭시다.</TitleStyle>
          <TitleStyle>어쩌고 저쩌고 ~~~~~~~~~~</TitleStyle>
          <TitleStyle>어쩌고 저쩌고 ~~~~~~~~~~</TitleStyle>
        </Fade>
      </ContentDivStyle>
      {/* <Fade duration={1500} direction={'right'}> */}
      <MainImageStyle src={first} />
      {/* </Fade> */}
    </ComponentStyle>
  );
}

export default FirstComponent;
