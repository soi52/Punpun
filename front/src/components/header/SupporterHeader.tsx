import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { isRegisterStoreState } from '../../store/atoms';
import UserTypeSelector from './UserTypeSelector';

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

interface SupporterHeaderProps {
  toMain: () => void;
  onLogout: () => void;
  onSelect: (item: string) => void;
  userType: string;
  items: string[];
  selectedItem: string | undefined;
  isOwnerRole: Boolean;
}

function SupporterHeader(props: SupporterHeaderProps) {
  const { onLogout, toMain, onSelect, items, selectedItem, isOwnerRole } =
    props;
  const navigate = useNavigate();

  const toSuSearch = () => {
    navigate('/susearch');
  };

  const toSuMypage = () => {
    navigate('/suuser');
  };

  return (
    <NavUl>
      <NavLi onClick={toMain}>사업소개</NavLi>
      <NavLi onClick={toSuSearch}>가게찾기</NavLi>
      <NavLi onClick={toSuMypage}>마이페이지</NavLi>
      <NavLi onClick={onLogout}>로그아웃</NavLi>
      {isOwnerRole && (
        <UserTypeSelector
          onSelect={onSelect}
          items={items}
          selectedItem={selectedItem}
          isOwnerRole={isOwnerRole}
        />
      )}
    </NavUl>
  );
}

export default SupporterHeader;
