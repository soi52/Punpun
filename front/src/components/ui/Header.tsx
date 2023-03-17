import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Logo from './Logo';
import Dropdown from './Dropdown';

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 80px;
  border-bottom: solid;
  border-bottom-width: 2px;
  border-bottom-color: #dcdde1;
  justify-content: space-between;
`;

const Contents = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  justify-content: flex-end;
`;

const NavUl = styled.ul`
  display: flex;
  list-style: none;
  cursor: pointer;
`;

const NavLi = styled.li`
  margin: 30px;
`;

type HeaderProps = {
  onSelect: (item: string) => void;
};

function Header(props: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isChild, setIsChild] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [selectedItem, setSelectedItem] = useState('후원자');
  const [drop, setDrop] = useState(false);
  const navigate = useNavigate();

  const toLogin = () => {
    navigate('/login');
  };

  const toMain = () => {
    navigate('/sumain');
  };

  const toChMain = () => {
    navigate('/chmain');
  };

  const toMyPage = () => {
    navigate('/chuser');
  };

  const toOwStore = () => {
    navigate('/owstore/:store_id');
  };
  const toOwBooking = () => {
    navigate('/owstore/:store_id/booking');
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    toMain();
  };

  const onSelect = (item: string) => {
    setSelectedItem(item);
    if (item === '사장님') {
      setIsOwner(true);
      toOwStore();
    } else if (item === '후원자') {
      setIsOwner(false);
      toMain();
    }
  };

  const selectMe = () => {
    setDrop(!drop);
  };

  const seleteChild = () => {
    setIsChild(!isChild);
    toChMain();
  };

  const renderNav = () => {
    if (isLoggedIn) {
      if (isChild) {
        return (
          <NavUl>
            <NavLi onClick={toChMain}>가게찾기</NavLi>
            <NavLi onClick={toMyPage}>마이페이지</NavLi>
            <NavLi onClick={onLogout}>로그아웃</NavLi>
          </NavUl>
        );
      } else if (isOwner) {
        return (
          <NavUl>
            <NavLi onClick={toOwStore}>가게운영</NavLi>
            <NavLi onClick={toOwBooking}>예약관리</NavLi>
            <NavLi onClick={onLogout}>로그아웃</NavLi>
            <NavLi onClick={selectMe}>
              {selectedItem}{' '}
              {drop && (
                <Dropdown
                  onSelect={onSelect}
                  items={isOwner ? ['후원자'] : ['사장님']}
                  selectedItem={selectedItem}
                />
              )}
            </NavLi>
          </NavUl>
        );
      } else {
        return (
          <NavUl>
            <NavLi onClick={toMain}>사업소개</NavLi>
            <NavLi>가게찾기</NavLi>
            <NavLi onClick={onLogout}>로그아웃</NavLi>
            <NavLi onClick={selectMe}>
              {selectedItem}{' '}
              {drop && (
                <Dropdown
                  onSelect={onSelect}
                  items={isOwner ? ['후원자'] : ['사장님']}
                  selectedItem={selectedItem}
                />
              )}
            </NavLi>
          </NavUl>
        );
      }
    } else {
      return (
        <NavUl>
          <NavLi onClick={toMain}>사업소개</NavLi>
          <NavLi>가게찾기</NavLi>
          <NavLi onClick={toLogin}>로그인</NavLi>
        </NavUl>
      );
    }
  };
  return (
    <Wrapper>
      <Logo />
      <button onClick={seleteChild}>{isChild ? '어린이' : '일반'}</button>
      <Contents>
        <nav>{renderNav()}</nav>
      </Contents>
    </Wrapper>
  );
}

export default Header;
