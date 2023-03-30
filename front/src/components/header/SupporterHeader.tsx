import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserTypeSelector from './UserTypeSelector';

const NavUl = styled.ul`
  display: flex;
  list-style: none;
  cursor: pointer;
`;

const NavLi = styled.li`
  margin: 30px;
`;

interface SupporterHeaderProps {
  toMain: () => void;
  onLogout: () => void;
  onSelect: (item: string) => void;
  userType: string;
  items: string[];
  selectedItem: string | undefined;
  role: string;
}

function SupporterHeader(props: SupporterHeaderProps) {
  const { onLogout, toMain, onSelect, items, selectedItem, role } = props;
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
      <UserTypeSelector
        onSelect={onSelect}
        items={items}
        selectedItem={selectedItem}
        role={role}
      />
    </NavUl>
  );
}

export default SupporterHeader;
