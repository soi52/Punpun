import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Logo from './Logo';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  isLoggedInState,
  isOwnerRoleState,
  isOwnerState,
  isRegisterStoreState,
  isSupporterState,
  owStoreState,
} from '../../store/atoms';
import ChildHeader from '../header/ChildHeader';
import OwnerHeader from '../header/OwnerHeader';
import SupporterHeader from '../header/SupporterHeader';
import API from '../../store/API';
import { removeCookie } from '../auth/Cookie';

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 80px;
  padding: 0px 30px 0px 30px;
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
  position: relative;
  margin: 30px;
  text-decoration: none;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 2px;
    background-color: #5d5a88;
    transition: width 0.3s ease-in-out;
  }

  &:hover::before {
    width: 100%;
  }

  &:not(:hover)::before {
    right: 0;
    left: auto;
  }
`;

type HeaderProps = {
  onSelect: (item: string) => void;
};

function Header(props: HeaderProps) {
  const role: string = localStorage.getItem('role') || '';
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [isOwner, setIsOwner] = useRecoilState(isOwnerState);
  const [isSupporter, setIsSupporter] = useRecoilState(isSupporterState);
  const isRegisterStore = useRecoilValue(isRegisterStoreState);
  const [isOwnerRole, setIsOwnerRole] = useRecoilState(isOwnerRoleState);
  const [selectedItem, setSelectedItem] = useState('후원자');
  const [owStores, setOwStores] = useRecoilState(owStoreState);
  const navigate = useNavigate();

  const toLogin = () => {
    const kakaoLogin =
      'http://j8d109.p.ssafy.io/api/oauth2/authorization/kakao';
    window.location.replace(kakaoLogin);
  };

  const toMain = () => {
    navigate('/sumain');
  };

  const toOwStore = () => {
    navigate(`/owstore/${owStores[0].storeId}`);
  };

  const onLogout = () => {
    localStorage.removeItem('role');
    removeCookie('accessToken');
    removeCookie('refreshToken');
    setIsLoggedIn(false);
    toMain();
  };

  const onSelect = (item: string) => {
    setSelectedItem(item);
    if (item === '사장님') {
      setIsOwner(true);
      setIsSupporter(false);
      toOwStore();
    } else if (item === '후원자') {
      setIsOwner(false);
      setIsSupporter(true);
      toMain();
    }
  };

  useEffect(() => {
    if (isOwnerRole) {
      API.get('stores/list')
        .then((response: any) => {
          console.log(response.data);
          setOwStores(response.data);
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  }, [isOwnerRole]);

  // useEffect(() => {
  //   if (owStores.length) {
  //     setIsOwnerRole(true);
  //   }
  // }, [owStores]);

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
            isOwnerRole={isOwnerRole}
          />
        );
      } else {
        return (
          <SupporterHeader
            onSelect={onSelect}
            onLogout={onLogout}
            toMain={toMain}
            userType="supporter"
            items={isOwner ? ['후원자'] : ['사장님']}
            selectedItem={selectedItem}
            isOwnerRole={isOwnerRole}
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
