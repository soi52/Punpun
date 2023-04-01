import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import API from '../../../store/API';
import { owStoreMenuState, selectedStoreState } from '../../../store/atoms';
import StoreInfo from '../StoreInfo';
import StoreMenu from './StoreMenu';

const Wrapper = styled.div`
  padding: 20px;
`;

function StoreManage() {
  const navigate = useNavigate();
  const [storeMenus, setStoreMenus] = useRecoilState(owStoreMenuState);
  const selectedStore = useRecoilValue(selectedStoreState);

  useEffect(() => {
    API.get(`stores/${selectedStore?.storeId}`)
      .then((response) => {
        // console.log(response.data);
        console.log(response.data.menuMemberResponseDTOList);
        setStoreMenus(response.data.menuMemberResponseDTOList);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedStore]);

  return (
    <Wrapper>
      <StoreInfo />
      <h2>가게 정보</h2>
      <StoreMenu storeMenus={storeMenus} />
      <button onClick={() => navigate('/owregister')}>수정하기</button>
    </Wrapper>
  );
}
export default StoreManage;
