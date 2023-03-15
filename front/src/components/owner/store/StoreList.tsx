import styled from 'styled-components';
import StoreListItem from './StoreListItem';
import { useState } from 'react';

const Wrapper = styled.div`
  padding: 20px;
`;

interface Store {
  id: number;
  storeName: string;
  storeText: string;
}

interface StoreItemProps {
  stores: Store[];
  onDelete: (id: number) => void;
}

function StoreList() {
  const [stores, setStores] = useState<Store[]>([
    {
      id: 1,
      storeName: '스테이크 팩토리1',
      storeText: '항상 후원',
    },
    {
      id: 2,
      storeName: '스테이크 팩토리2',
      storeText: '항상 후원',
    },
    {
      id: 3,
      storeName: '스테이크 팩토리3',
      storeText: '항상 후원',
    },
  ]);

  const handleDelete = (id: number) => {
    const updatedStores = stores.filter((store: Store) => store.id !== id);
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
