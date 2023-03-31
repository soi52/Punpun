import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { OwStore, selectedStoreState } from '../../../store/atoms';

interface StoreItemProps {
  stores: OwStore[];
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

const StoreText = styled.p`
  font-size: 16px;
  color: #666;
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

function StoreListItem({ stores, onDelete }: StoreItemProps) {
  const navigate = useNavigate();
  const setSelectedStore = useSetRecoilState(selectedStoreState); // 새로 추가된 코드

  const handleDelete = (id: number) => {
    onDelete(id);
  };

  const StoreList = stores.map((store) => (
    <StoreInfoList key={store.storeId}>
      <div
        onClick={() => {
          navigate(`/owstore/${store.storeId}`);
          setSelectedStore(store);
        }}
      >
        <StoreName>{store.storeName}</StoreName>
        <StoreInfo>{store.storeInfo}</StoreInfo>
        <StoreText>
          항상 나눔
          <input type="checkbox" />
        </StoreText>
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
