import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  owStoreState,
  selectedStoreState,
  ShareListState,
  userInfoState,
} from '../../store/atoms';
import MainMessage from '../ui/MainMessage';
import MainTitle from '../ui/MainTitle';
import API from '../../store/API';

function StoreInfo() {
  const userInfo = useRecoilValue(userInfoState);
  const [selectedStore, setSelectedStore] = useRecoilState(selectedStoreState);
  const [shareList, setShareList] = useRecoilState(ShareListState);
  const stores = useRecoilValue(owStoreState);

  useEffect(() => {
    if (!selectedStore) {
      setSelectedStore(stores[0]);
    } else {
      API.get(`stores/${selectedStore.storeId}`)
        .then((response: any) => {
          // console.log(response.data);
          setSelectedStore(response.data);
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  }, [setSelectedStore, stores, shareList]);

  useEffect(() => {
    const config = {
      params: {
        page: 0,
        type: 'SHARE',
      },
    };
    API.get(`supports/${selectedStore?.storeId}`, config)
      .then((response) => {
        setShareList(response.data.content);
        // console.log(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h2>
        <MainTitle
          title={`건강한 사랑과 식사를 나눠주시는 ${selectedStore?.storeName}`}
        />
      </h2>
      <MainMessage
        message={shareList.length > 0 ? `　${userInfo.userName} 사장님, 어느 새 ${shareList.length}번의 식사 나눔을 하셨네요!` : `　${userInfo.userName} 사장님, 따뜻한 마음을 나누어 보세요 :)`}
      />
    </>
  );
}

export default StoreInfo;
