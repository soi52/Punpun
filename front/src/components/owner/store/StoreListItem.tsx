import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { selectedStoreState, userInfoState } from '../../../store/atoms';
import API from '../../../store/API';
import { Store } from '../../../store/types';

interface StoreItemProps {
  stores: Store[];
  onDelete: (id: number) => void;
}

const StoreInfoList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  padding: 15px;
  border-radius: 20px;
  background-color: #ffffff;
`;

const StoreName = styled.span`
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
  color: #333;
`;
const StoreInfo = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-right: 10px;
  color: #333;
`;

const StoreText = styled.label`
  font-size: 16px;
  color: #666;
  margin-right: 5px;
`;

const DeleteButton = styled.button`
  font-size: 14px;
  color: #fff;
  background-color: #5d5a88;
  border: none;
  border-radius: 15px;
  padding: 8px 16px;
  cursor: pointer;
`;

const CheckBox = styled.input`
  margin-right: 10px 0px 0px 10px;
  background-color: #5d5a88;
`;

function StoreListItem({ stores, onDelete }: StoreItemProps) {
  // console.log(stores);
  const navigate = useNavigate();
  const setSelectedStore = useSetRecoilState(selectedStoreState); // 새로 추가된 코드
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const handleDelete = (id: number) => {
    if (stores.length === 1) {
      onDelete(id);
      API.get('users/member')
        .then((response: any) => {
          // console.log(response.data.role);
          localStorage.setItem('role', response.data.role);
          setUserInfo(response.data);
        })
        .catch((error: any) => {
          // console.error(error);
        });
      navigate('/sumain');
    } else {
      onDelete(id);
    }
  };

  const StoreList = stores.map((store) => (
    <StoreInfoList key={store.storeId}>
      <div
        onClick={() => {
          navigate(`/owstore/${store.storeId}`);
          setSelectedStore(store);
          // console.log(store);
        }}
      >
        <StoreName>{store.storeName}</StoreName>
        <StoreInfo>{store.storeInfo}</StoreInfo>
        <StoreText htmlFor="alwaysShare">항상 나눔</StoreText>
        <CheckBox
          type="checkbox"
          id="alwaysShare"
          checked={store.storeAlwaysShare ? true : false}
          readOnly
        />
      </div>
      <div>
        <DeleteButton onClick={() => handleDelete(store.storeId)}>
          삭제
        </DeleteButton>
      </div>
    </StoreInfoList>
  ));

  return <>{StoreList}</>;
}

export default StoreListItem;
