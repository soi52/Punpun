import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Logo from './Logo';
import Dropdown from './Dropdown';
import { useRecoilState } from 'recoil';
import {
  isChildState,
  isLoggedInState,
  isOwnerState,
  isSupporterState,
  OwStore,
  owStoreState,
} from '../../store/atoms';
import Cookies from 'js-cookie';

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

const StoreDropdown = styled.ul<{ show: boolean }>`
  display: none;
  position: absolute;
  //left: 75%;
  //transform: translateX(-50%);
  width: 200px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  z-index: 1;
  padding: 10px;

  ${({ show }) =>
    show &&
    `
    display: block;
  `}
`;

const StoreDropdownItem = styled.li`
  cursor: pointer;
  list-style: none;

  &:hover {
    color: white;
    background-color: #3f51b5;
  }
`;

type HeaderProps = {
  onSelect: (item: string) => void;
};

function Header(props: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [isChild, setIsChild] = useRecoilState(isChildState);
  const [isOwner, setIsOwner] = useRecoilState(isOwnerState);
  const [isSupporter, setIsSupporter] = useRecoilState(isSupporterState);
  const [selectedItem, setSelectedItem] = useState('후원자');
  const [drop, setDrop] = useState(false);
  const [storeDrop, setStoreDrop] = useState(false);
  const [selectedStore, setSelectedStore] = useState<OwStore | null>(null);
  const [owStore, setOWStore] = useRecoilState(owStoreState);
  const navigate = useNavigate();

  const selectStore = (store: OwStore | null) => {
    setSelectedStore(store);
    setStoreDrop(true);
    if (!store) {
      navigate('/stores');
    }
  };

  const toLogin = () => {
    navigate('/login');
  };

  const toMain = () => {
    navigate('/sumain');
  };
  const toSuSearch = () => {
    navigate('/susearch');
  };
  const toSuMypage = () => {
    navigate('/suuser');
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
  const toOwStoreList = () => {
    navigate('/owstorelist');
  };

  const onLogout = () => {
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
      setIsSupporter(true);
      setIsOwner(false);
      toMain();
    }
  };

  const selectMe = () => {
    setDrop(!drop);
  };

  const seleteChild = () => {
    setIsChild(!isChild);
    isOwner ? toChMain() : toMain();
  };

  const renderNav = () => {
    console.log(isLoggedIn);
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
            <NavLi onClick={() => setStoreDrop(!storeDrop)}>
              {selectedStore?.storeName ?? '가게 선택'}
              {storeDrop && (
                <StoreDropdown show={storeDrop}>
                  {owStore.map((store) => (
                    <StoreDropdownItem
                      key={store.id}
                      onClick={() => selectStore(store)}
                    >
                      {store.storeName}
                    </StoreDropdownItem>
                  ))}
                  <StoreDropdownItem onClick={() => navigate('/owstorelist')}>
                    전체 가게 관리
                  </StoreDropdownItem>
                </StoreDropdown>
              )}
            </NavLi>
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
            <NavLi onClick={toSuSearch}>가게찾기</NavLi>
            <NavLi onClick={toSuMypage}>마이페이지</NavLi>
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
