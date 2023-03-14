import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Logo from './Logo';
import Dropdown from './Dropdown';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 80px;
  border-bottom: solid;
  border-bottom-width: 2px;
  border-bottom-color: #dcdde1;
`;

const Contents = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  justify-content: flex-end;
  // width: 96%;
  // max-width: 1100px;
  height: 100%;
  margin: 0 auto;
`;

const NavUl = styled.ul`
  display: flex;
  list-style: none;
  cursor: pointer;
`;

const ChNav = styled.ul`
  display: flex;
  list-style: none;
  cursor: pointer;
`;

const NavLi = styled.li`
  margin: 30px;
`;

function Header() {
  // 드롭메뉴: 후원자 or 사장님
  const [isChild, setIsChild] = useState(true);
  const [drop, setDrop] = useState(false);
  const selectMe = () => setDrop((prev) => !prev);
  const navigate = useNavigate();

  const toLogin = () => {
    navigate('/login');
  };

  const toChMain = () => {
    navigate('/chmain');
  };

  const toMyPage = () => {
    navigate('/chuser');
  };

  const toMain = () => {
    navigate('/');
  };

  return (
    <>
      <Wrapper id="header">
        <Logo />
        <Contents id="contents">
          <nav>
            {isChild ? (
              <ChNav id="chnav">
                <NavLi onClick={toChMain}>가게찾기</NavLi>
                <NavLi onClick={toMyPage}>마이페이지</NavLi>
                <NavLi>로그아웃</NavLi>
              </ChNav>
            ) : (
              <NavUl>
                <NavLi onClick={toMain}>사업소개</NavLi>
                <NavLi>가게찾기</NavLi>
                <NavLi onClick={toLogin}>로그인</NavLi>
                <NavLi onClick={selectMe}>
                  후원자
                  {drop ? '^' : 'v'}
                  {drop && <Dropdown />}
                </NavLi>
              </NavUl>
            )}
          </nav>
        </Contents>
      </Wrapper>
    </>
  );
}

export default Header;
