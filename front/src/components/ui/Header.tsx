import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Logo from './Logo';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  isLoggedInState,
  isOwnerState,
  userInfoState,
} from '../../store/atoms';
import ChildHeader from '../header/ChildHeader';
import OwnerHeader from '../header/OwnerHeader';
import SupporterHeader from '../header/SupporterHeader';

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 80px;
  // border-bottom: solid;
  // border-bottom-width: 2px;
  // border-bottom-color: #dcdde1;
  justify-content: space-between;
  z-index: 5;
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
  const role: string = localStorage.getItem('role') || '';
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [isOwner, setIsOwner] = useRecoilState(isOwnerState);
  const [selectedItem, setSelectedItem] = useState('후원자');
  const navigate = useNavigate();

  const toLogin = () => {
    navigate('/login');
  };

  const toMain = () => {
    navigate('/sumain');
  };

  const toOwStore = () => {
    navigate('/owstore/:store_id');
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

  const renderNav = () => {
    if (isLoggedIn) {
      if (role === 'CHILD') {
        return <ChildHeader onLogout={onLogout} />;
      } else if (isOwner) {
        return (
          <OwnerHeader
            onSelect={onSelect}
            onLogout={onLogout}
            toOwStore={toOwStore}
            userType="owner"
            items={isOwner ? ['후원자'] : ['사장님']}
            selectedItem={selectedItem}
            role={role}
          />
        );
      } else {
        return (
          <SupporterHeader
            onSelect={onSelect}
            onLogout={onLogout}
            toMain={toMain}
            userType="supporter"
          />
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
      <Contents>
        <nav>{renderNav()}</nav>
      </Contents>
    </Wrapper>
  );
}

export default Header;
