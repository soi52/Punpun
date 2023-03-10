import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Logo from './Logo';
import Dropdown from './Dropdown';

const Wrapper = styled.div`
  position: fixed;
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
  align-items: center;
  justify-content: space-between;
  width: 96%;
  max-width: 1100px;
  height: 100%;
  margin: 0 auto;
`;

const NavUl = styled.ul`
  display: flex;
  list-style: none;
  cursor: pointer;
`;

const NavLi = styled.li`
  margin-left: 30px;
`;

function Header() {
  // 드롭메뉴: 후원자 or 사장님
  const [drop, setDrop] = useState(false);
  const selectMe = () => setDrop((prev) => !prev);
  const navigate = useNavigate();

  const toLogin = () => {
    navigate('/login');
  }

  return (
    <>
      <Wrapper>
        <Logo />
        <Contents>
          <nav>
            <NavUl>
              <NavLi>사업소개</NavLi>
              <NavLi>가게찾기</NavLi>
              <NavLi onClick={toLogin}>로그인</NavLi>
              <NavLi onClick={selectMe}>
                후원자
                {drop ? '^' : 'v'}
                {drop && <Dropdown />}
              </NavLi>
            </NavUl>
          </nav>
        </Contents>
      </Wrapper>
    </>
  );
}

export default Header;
