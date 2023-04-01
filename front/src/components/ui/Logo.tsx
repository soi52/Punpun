import styled, { keyframes } from 'styled-components';
import logoIMG from '../../resources/images/logo.png';
import logoIMG1 from '../../resources/images/logo (1).png';
import logoIMG2 from '../../resources/images/logo (2).png';
import logoIMG3 from '../../resources/images/logo (3).png';

const bounce = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
`;

const LogoImgWrapper = styled.div`
  display: flex;
`;

const LogoImg = styled.div`
  display: flex;
  justify-content: center;
  width: 25px;
  height: 25px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  animation: ${bounce} 1s ease-in-out infinite;
`;

function Logo() {
  return (
    <>
      <LogoImgWrapper>
        <LogoImg style={{ backgroundImage: `url(${logoIMG1})`, animationDelay: '0s' }} />
        <LogoImg style={{ backgroundImage: `url(${logoIMG1})`, animationDelay: '0.2s' }} />
        <LogoImg style={{ backgroundImage: `url(${logoIMG2})`, animationDelay: '0.4s' }} />
        <LogoImg style={{ backgroundImage: `url(${logoIMG3})`, animationDelay: '0.6s' }} />
      </LogoImgWrapper>
    </>
  );
}

export default Logo;
