import React, { useState } from 'react';
import styled from 'styled-components';
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
  menuImage: string | null;
  menuImageName: string | null;
  menuSponsoredCount: number;
};

type ChMenuListProps = {
  chMenuList: ChMenuDTO[];
};


const ChMenuList: React.FC<ChMenuListProps> = (props) => {

  const sortedMenuList = props.chMenuList.sort(
    (a, b) => b.menuSponsoredCount - a.menuSponsoredCount
  );

  if (!sortedMenuList) {
    return <Loading />;
  }

  return (
    <Container>
      <MenuListContainer>
        {sortedMenuList.map((menu, index) => {
          return (
            <ChMenuCard
              key={index}
              id={menu.menuId}
              title={menu.menuName}
              price={menu.menuPrice}
              favoriteMenu={menu.favoriteMenu}
              menuCount={menu.menuSponsoredCount}
              menuImage={menu.menuImage}
              menuImageName={menu.menuImageName}
            />
          );
        })}
      </MenuListContainer>
    </Container>
  );
};

export default ChMenuList;
