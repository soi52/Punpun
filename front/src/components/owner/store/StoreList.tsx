import styled from 'styled-components';
import StoreListItem from './StoreListItem';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { OwStore, owStoreState } from '../../../store/atoms';

const Wrapper = styled.div`
  padding: 20px;
`;

interface StoreItemProps {
  stores: OwStore[];
  onDelete: (id: number) => void;
}

function StoreList() {
  const [stores, setStores] = useRecoilState(owStoreState);

  const handleDelete = (id: number) => {
    const updatedStores = stores.filter((store: OwStore) => store.id !== id);
    setStores(updatedStores);
  };

  return (
    <Wrapper>
      <h1>가맹점 목록</h1>
      <StoreListItem stores={stores} onDelete={handleDelete} />
    </Wrapper>
  );
}

export default StoreList;
