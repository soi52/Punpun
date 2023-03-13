import React from 'react';
import styled from 'styled-components';
import Sidebar from '../../ui/Sidebar';

type MenuItem = {
  name: string;
  onClick: () => void;
};

type BookingSidebarData = {
  items: MenuItem[];
};

type BookingSidebarProps = {
  onClickBookingToday: () => void;
  onClickBookingList: () => void;
  onClickShare: () => void;
  onClickShareList: () => void;
};

const BookingSidebar = ({
  onClickBookingToday,
  onClickBookingList,
  onClickShare,
  onClickShareList,
}: BookingSidebarProps) => {
  const storeSidebarData: BookingSidebarData = {
    items: [
      { name: '오늘의 예약', onClick: onClickBookingToday },
      { name: '예약 목록', onClick: onClickBookingList },
      { name: '나눔 등록', onClick: onClickShare },
      { name: '나눔 목록', onClick: onClickShareList },
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

export default BookingSidebar;
