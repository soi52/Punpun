import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  owStoreState,
  selectedStoreState,
  userInfoState,
} from '../../store/atoms';
import MainMessage from '../ui/MainMessage';
import MainTitle from '../ui/MainTitle';
import API from '../../store/API';

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
    } else {
      API.get(`stores/${selectedStore.storeId}`)
        .then((response: any) => {
          console.log(response.data);
          setSelectedStore(response.data);
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  }, [setSelectedStore, stores]);

  return (
    <>
      <h2>
        <MainTitle title={`${storeInfo.title} ${selectedStore?.storeName}`} />
      </h2>
      <MainMessage
        message={`　${userInfo.userName} 사장님, ${storeInfo.message}`}
      />
    </>
  );
}

export default StoreInfo;
