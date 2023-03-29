import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router';
import SidebarContent from './SidebarContent';
import SuSidebarContent from './SuSidebarContent';
import Profile from './Profile';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { isSupporterState } from '../../store/atoms';

const SidebarStyle = styled.div`
  background-color: white;
  border-radius: 1rem;
  width: 13rem;
  height: 38rem;
  // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  float: left;
  margin-right: 1.3rem;
  display: block;
  flex-direction: column;
  align-items: center;
`;

const ProfileDiv = styled.div`
  padding-top: 20px;
`;

const HrDIv = styled.hr`
  width: 11rem;
  margin-top: 50px;
  margin-bottom: 20px;
`;

const HrDIv2 = styled.hr`
  width: 11rem;
  margin-top: 20px;
  margin-bottom: 50px;
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
  const isSupporter = useRecoilValue(isSupporterState);

  const navigate = useNavigate();

  // 사이드메뉴 hr 안
  const handleMenuItemClick = (index: number) => {
    setCurrentMenuItemIndex(index);
  };

  // 사이드메뉴 충전하기 클릭

  return (
    <>
      <SidebarStyle>
        {/* <H2>{title}</H2> */}
        <ProfileDiv>
          <Profile />
        </ProfileDiv>
        <HrDIv />
        <SidebarContent
          menuItems={menuItems}
          currentMenuItemIndex={currentMenuItemIndex}
          onMenuItemClick={handleMenuItemClick}
        />
        <HrDIv2 />
        {/* {isSupporter ? ( */}
          <SuSidebarContent
            menuItems={menuItems}
            currentMenuItemIndex={currentMenuItemIndex}
            onMenuItemClick={handleMenuItemClick}
          />
        {/* // ) : null} */}
      </SidebarStyle>
    </>
  );
};

export default Sidebar;
