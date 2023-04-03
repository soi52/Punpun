import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  owStoreState,
  selectedStoreState,
  userInfoState,
} from '../../store/atoms';
import MainMessage from '../ui/MainMessage';
import MainTitle from '../ui/MainTitle';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px;
`;

function StoreInfo() {
  const userInfo = useRecoilValue(userInfoState);
  const [selectedStore, setSelectedStore] = useRecoilState(selectedStoreState);
  const stores = useRecoilValue(owStoreState);

  const storeInfo = {
    title: '따뜻한 사랑과 건강한 식사를 나눠주시는',
    ownerName: '김싸피 사장님',
    message: '어느새 10번의 식사 나눔을 하셨네요!',
    name: '싸피식당',
  };

  useEffect(() => {
    if (!selectedStore) {
      setSelectedStore(stores[0]);
    }
  }, [selectedStore, setSelectedStore, stores]);

  return (
    <Wrapper>
      <h2>
        <MainTitle title={`${storeInfo.title} ${selectedStore?.storeName}`} />
      </h2>
      <MainMessage message={`${userInfo.userName} 사장님, ${storeInfo.message}`} />
    </Wrapper>
  );
}

export default StoreInfo;
