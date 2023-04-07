import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import API from '../../../store/API';
import {
  isUpdatedState,
  owStoreMenuState,
  selectedStoreState,
} from '../../../store/atoms';
import StoreInfo from '../StoreInfo';
import StoreMenu from './StoreMenu';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px;
`;

const Div = styled.div`
  padding-top: 10px;
`;

function StoreMenuList() {
  const selectedStore = useRecoilValue(selectedStoreState);
  const [storeMenus, setStoreMenus] = useRecoilState(owStoreMenuState);
  const [isUpdated, setIsUpdated] = useRecoilState(isUpdatedState);

  useEffect(() => {
    setIsUpdated(!isUpdated);
  }, []);

  useEffect(() => {
    if (selectedStore) {
      API.get(`stores/${selectedStore.storeId}`)
        .then((response) => {
          setStoreMenus(response.data.menuMemberResponseDTOList);
        })
        .catch((error) => {
          // console.error(error);
        });
    }
  }, [isUpdated, selectedStore]);

  return (
    <Wrapper>
      <StoreInfo />
      <Div>
        <h2>메뉴 관리</h2>
        <StoreMenu storeMenus={storeMenus} />
      </Div>
    </Wrapper>
  );
}

export default StoreMenuList;
