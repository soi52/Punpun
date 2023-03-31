import { useRecoilValue } from 'recoil';
import {
  owStoreState,
  selectedStoreState,
  userInfoState,
} from '../../store/atoms';
import MainMessage from '../ui/MainMessage';
import MainTitle from '../ui/MainTitle';

function StoreInfo() {
  const userInfo = useRecoilValue(userInfoState);
  const selectedStore = useRecoilValue(selectedStoreState);
  const stores = useRecoilValue(owStoreState);

  const storeInfo = {
    title: '따뜻한 사랑과 건강한 식사를 나눠주시는',
    ownerName: '김싸피 사장님',
    message: '어느새 10번의 식사 나눔을 하셨네요!',
    name: '싸피식당',
  };

  const storeName = selectedStore
    ? selectedStore.storeName
    : stores[0].storeName;

  return (
    <>
      <h2>
        <MainTitle title={`${storeInfo.title} ${storeName}`} />
      </h2>
      <MainMessage message={`${userInfo.userName}, ${storeInfo.message}`} />
    </>
  );
}

export default StoreInfo;
