import styled from 'styled-components';

const LogoTitle = styled.h3`
  display: inline-block;
  justify-content: center;

  cursor: pointer;
`;

function Logo() {
  return (
    <>
      <LogoTitle>PUNPUN</LogoTitle>
    </>
  );
}

export default Logo;
