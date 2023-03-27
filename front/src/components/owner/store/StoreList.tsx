import styled from 'styled-components';
import StoreListItem from './StoreListItem';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { OwStore, owStoreState } from '../../../store/atoms';
import { useNavigate } from 'react-router';

const Wrapper = styled.div`
  padding: 20px;
`;

const RegisterButton = styled.button`
  font-size: 15px;
  color: #fff;
  background-color: #5d5a88;
  border: none;
  border-radius: 15px;
  padding: 8px 16px;
  cursor: pointer;
  margin-left: auto;
`;

interface StoreItemProps {
  stores: OwStore[];
  onDelete: (id: number) => void;
}

function StoreList() {
  const [stores, setStores] = useRecoilState(owStoreState);
  const navigate = useNavigate();

  const toStoreRegister = () => {
    navigate('/owregister');
  };

  const handleDelete = (id: number) => {
    const updatedStores = stores.filter((store: OwStore) => store.id !== id);
    setStores(updatedStores);
  };

  return (
    <Wrapper>
      <h1>가맹점 목록</h1>
      <StoreListItem stores={stores} onDelete={handleDelete} />
      <RegisterButton onClick={toStoreRegister}>가맹점 등록</RegisterButton>
    </Wrapper>
  );
}

export default StoreList;
