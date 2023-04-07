import { useState, useEffect } from 'react';
import styled from 'styled-components';
import StoreBanner from './Storebanner';
import ChMenuList from './ChMenuList';
import MenuList from './MenuList';
import API from '../../../store/API';
import { useRecoilValue } from 'recoil';
import { selectedStoreState } from '../../../store/atoms';

const Wrapper = styled.div`
  padding: 20px;
`;

const Div = styled.div`
  padding-top: 20px;
`;

type MenuDTO = {
  menuId: number;
  menuName: string;
  menuPrice: number;
  menuCount: number;
  menuImage: string | null;
  menuImageName: string | null;
};

type ChMenuDTO = {
  menuId: number;
  menuName: string;
  menuPrice: number;
  favoriteMenu: boolean;
  menuImage: string | null;
  menuImageName: string | null;
  menuSponsoredCount: number;
};

type Props = {
  myStoreId: string | undefined;
};

const StoreMenu = ({ myStoreId }: Props) => {
  const [menuDTOList, setMenuDTOList] = useState<MenuDTO[]>([]);
  const [chMenuDTOList, setChMenuDTOList] = useState<ChMenuDTO[]>([]);
  const [storeName, setStoreName] = useState<string | undefined>();
  const selectedStore = useRecoilValue(selectedStoreState);

  const role = localStorage.getItem('role');

  useEffect(() => {
    if (role === 'CHILD') {
      if (myStoreId) {
        API.get(`stores/child/${myStoreId}`)
          .then((response) => {
            setChMenuDTOList(response.data.menuChildResponseDTOList);
            setStoreName(response.data.storeName);
          })
          .catch((error) => {
            // console.log(error);
          });
      }
    } else {
      if (myStoreId) {
        API.get(`stores/${myStoreId}`)
          .then((response) => {
            setMenuDTOList(response.data.menuMemberResponseDTOList);
            setStoreName(response.data.storeName);
            // console.log(response.data.menuMemberResponseDTOList);
          })
          .catch((error) => {
            // console.log(error);
          });
      }
    }
  }, [myStoreId, selectedStore]);

  return (
    <Wrapper id="wrapper">
      <StoreBanner storeName={storeName} />
      <Div>
        {role === 'CHILD' ? (
          <ChMenuList chMenuList={chMenuDTOList} />
        ) : (
          <MenuList menuDTOList={menuDTOList} />
        )}
      </Div>
    </Wrapper>
  );
};

export default StoreMenu;
