import styled, { keyframes } from 'styled-components';
import first from '../../resources/images/main12.jpg';
import { Fade } from 'react-awesome-reveal';


const bgAnim = keyframes`
  to {
    background-position: 200% center;
  }
`;


const H2 = styled.h2`
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent; 
  -moz-text-fill-color: transparent;
  animation: 1.5s ease-in 0s infinite running ${bgAnim};
  font-size: 2rem;
  background-image: linear-gradient(to right, #bd07b7 25%, #0872f5 50%, #f70347 100%);
  background-size: 200% auto;
  cursor: pointer;
  &:hover,
  &:focus {
    color: white;
    background-color: rgba(140, 150, 181, 1);
  }
`;

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
  margin-bottom: 30px;
`;

const ContentStyle = styled.h4`
  width: 50%;
`;

const Div = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;

const Button = styled.button`
  margin: 50px;
  width: 200px;
  height: 50px;
  font-size: 24px;
  font-weight: bold;
  color: black;
  border-radius: 25px;
  border: none;
  background-color: #A267AA;
  cursor: pointer;
  &:hover,
  &:focus {
    color: white;
    background-color: rgba(140, 150, 181, 1);
  }
`;

function FourthComponent() {

  const toLogin = () => {
    const kakaoLogin =
      'http://j8d109.p.ssafy.io/api/oauth2/authorization/kakao';
    window.location.replace(kakaoLogin);
  };

  return (
    <ComponentStyle>
      <ContentDivStyle>
        <Fade duration={1500} direction={'down'}>
          <Div>
            <TitleStyle>'PUNPUN'의 가족이 되어주세요.</TitleStyle>
            {/* <Button>회원가입</Button> */}
            <H2 onClick={toLogin}>{'>'}{'>'} 회원가입</H2>
          </Div>
        </Fade>
      </ContentDivStyle>
      <MainImageStyle src={first} />
    </ComponentStyle>
  );
}

export default FourthComponent;
