import styled, { keyframes } from 'styled-components';
import logoIMG from '../../resources/images/logo.png';
import logoIMG1 from '../../resources/images/logo (1).png';
import logoIMG2 from '../../resources/images/logo (2).png';
import logoIMG3 from '../../resources/images/logo (3).png';
import { useNavigate } from 'react-router';

const bounce = keyframes`
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-3px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(-2px);
  }
  100% {
    transform: translateY(0);
  }
`;

// const bounce = keyframes`
//   0% {
//     transform: translateY(0);
//   }
//   50% {
//     transform: translateY(-5px);
//   }
//   100% {
//     transform: translateY(0);
//   }
// `;

const LogoImgWrapper = styled.div`
  display: flex;
  margin-left: 10px;
  &:hover {
    // background-color: #ff3b3b;
    opacity: 0.8;
    transform: scale(1.01);
  }
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
  cursor: pointer;
`;

function Logo() {
  const navigate = useNavigate();
  const toMain = () => {
    navigate('/sumain');
  };

  return (
    <>
      <LogoImgWrapper onClick={toMain}>
        <LogoImg style={{ backgroundImage: `url(${logoIMG1})`, animationDelay: '0s' }} />
        <LogoImg style={{ backgroundImage: `url(${logoIMG1})`, animationDelay: '0.2s' }} />
        <LogoImg style={{ backgroundImage: `url(${logoIMG2})`, animationDelay: '0.4s' }} />
        <LogoImg style={{ backgroundImage: `url(${logoIMG3})`, animationDelay: '0.6s' }} />
      </LogoImgWrapper>
    </>
  );
}

export default Logo;
