import styled from 'styled-components';
import logoIMG from '../../resources/images/logo.png';
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
      <img
        src={logoIMG}
        alt="logo"
        width="100px"
        style={{ marginLeft: '10px' }}
      />
    </>
  );
}

export default Logo;
