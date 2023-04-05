import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router';
import SidebarContent from './SidebarContent';
import SuSidebarContent from './SuSidebarContent';
import Profile from './Profile';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isRegisterState, isSupporterState } from '../../store/atoms';

const SidebarStyle = styled.div`
  background-color: white;
  border-radius: 1rem;
  width: 13rem;
  height: 39rem;
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

const RegisterButton = styled.button`
  font-size: 13px;
  color: #fff;
  background-color: #5d5a88;
  border-radius: 15px;
  padding: 8px 16px;
  cursor: pointer;
  margin-left: auto;
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
  const [isRegister, setIsRegister] = useRecoilState(isRegisterState);

  const navigate = useNavigate();

  // 사이드메뉴 hr 안
  const handleMenuItemClick = (index: number) => {
    setCurrentMenuItemIndex(index);
  };

  // 사이드메뉴 충전하기 클릭
  const role = localStorage.getItem('role');

  const toStoreRegister = () => {
    setIsRegister(true);
    console.log(isRegister);
    navigate('/owregister');
  };

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
        {role !== 'CHILD' && isSupporter ? (
          <>
            <SuSidebarContent
              menuItems={menuItems}
              currentMenuItemIndex={currentMenuItemIndex}
              onMenuItemClick={handleMenuItemClick}
            />
            <RegisterButton onClick={toStoreRegister}>
              가맹점 등록
            </RegisterButton>
          </>
        ) : null}
      </SidebarStyle>
    </>
  );
};

export default Sidebar;
