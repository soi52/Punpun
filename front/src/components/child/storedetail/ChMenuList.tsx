import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { storeState } from '../../../store/atoms';
import ChMenuCard from './ChMenuCard';
import Loading from '../../ui/Loading';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuListContainer = styled.div`
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px auto;
  gap: 20px;
`;

type ChMenuDTO = {
  menuId: number;
  menuName: string;
  menuPrice: number;
  favoriteMenu: boolean;
};

type ChMenuListProps = {
  chMenuList: ChMenuDTO[];
};

const ChMenuList: React.FC<ChMenuListProps> = (props) => {
  if (!props.chMenuList) {
    return <Loading />;
  }

  return (
    <Container>
      <MenuListContainer>
        {props.chMenuList.map((menu, index) => {
          return (
            <ChMenuCard
              key={index}
              id={menu.menuId}
              title={menu.menuName}
              price={menu.menuPrice}
              favoriteMenu={menu.favoriteMenu}
            />
          );
        })}
      </MenuListContainer>
    </Container>
  );
};

export default ChMenuList;
