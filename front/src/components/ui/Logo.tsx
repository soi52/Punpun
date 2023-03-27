import styled from 'styled-components';
import logoIMG from '../../resources/images/handshake.png';
// import logoIMG from '../../resources/images/thumb.png';

// const LogoTitle = styled.h3`
//   text-align: center;
//   float: left;
//   cursor: pointer;
// `;

const LogoImg = styled.div`
  background: url(${logoIMG}) no-repeat center;
  width: 100px;
  background-size: 100%;
`;

function Logo() {
  return (
    <>
      {/* <LogoTitle>PUNPUN</LogoTitle> */}
      {/* <LogoImg /> */}
      <img src={logoIMG} alt="logo" width="80px" />
    </>
  );
}

export default Logo;
