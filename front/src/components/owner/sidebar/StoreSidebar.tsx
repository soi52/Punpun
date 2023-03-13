import React from 'react';
import styled from 'styled-components';
import Sidebar from '../../ui/Sidebar';

type MenuItem = {
  name: string;
  onClick: () => void;
};

type StoreSidebarData = {
  items: MenuItem[];
};

type StoreSidebarProps = {
  onClickStore: () => void;
  onClickThanks: () => void;
};

const StoreSidebar = ({ onClickStore, onClickThanks }: StoreSidebarProps) => {
  const storeSidebarData: StoreSidebarData = {
    items: [
      { name: '가게 관리', onClick: onClickStore },
      { name: '감사메세지 관리', onClick: onClickThanks },
    ],
  };

  return (
    <Sidebar>
      {storeSidebarData.items.map((item: MenuItem, index: number) => (
        <MenuItemWrapper key={index} onClick={item.onClick}>
          <span style={{ marginLeft: '16px' }}>{item.name}</span>
        </MenuItemWrapper>
      ))}
    </Sidebar>
  );
};

const MenuItemWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #f9fafb;
    border-left: 4px solid #5b5b5b;
    transition: 0.2s ease-in-out;
  }
`;

export default StoreSidebar;
