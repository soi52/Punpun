import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import SidebarContent from './SidebarContent';
import Profile from './Profile';
import styled from 'styled-components';

const SidebarStyle = styled.div`
  background-color: #eff3f8;
  border-radius: 1rem;
  width: 13rem;
  height: 35rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  float: left;
  margin-right: 20px;
`;

interface SidebarProps {
  title: string;
  menuItems: { title: string; component: FC }[];
  currentMenuItemIndex: number;
  setCurrentMenuItemIndex: (index: number) => void;
}

const Sidebar: FC<SidebarProps> = ({
  title,
  menuItems,
  currentMenuItemIndex,
  setCurrentMenuItemIndex,
}) => {
  const navigate = useNavigate();
  const handleMenuItemClick = (index: number) => {
    setCurrentMenuItemIndex(index);
  };

  const toMain = () => {
    navigate('/chuser');
  };

  return (
    <SidebarStyle>
      <h2 onClick={toMain}>{title}</h2>
      <div>
        <Profile />
      </div>
      <SidebarContent
        menuItems={menuItems}
        currentMenuItemIndex={currentMenuItemIndex}
        onMenuItemClick={handleMenuItemClick}
      />
    </SidebarStyle>
  );
};

export default Sidebar;
