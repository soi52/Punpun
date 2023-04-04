import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Store, selectedMyStoreState } from '../../../store/atoms';
import { useRecoilState } from 'recoil';

type StoreRegisterItemProps = {
  store: Store;
  index: number;
  onSelectStore: (store: Store | null) => void;
  selectedMyStore: Store | null;
};

interface ListItemProps {
  isSelected: boolean;
}

const ListItem = styled.li<ListItemProps>`
  list-style: none;
  margin: 10px;
  padding: 10px;
  border-radius: 20px;
  background-color: ${(props) => (props.isSelected ? 'lightgray' : 'white')};
  cursor: pointer;
`;

const StoreName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const StoreInfo = styled.div`
  margin-top: 10px;
  display: flex;
`;

const StoreInfoContent = styled.div`
  font-size: 16px;
  margin-top: 5px;
`;

const StoreRegisterItem = ({
  store,
  index,
  onSelectStore,
}: // selectedMyStore,
StoreRegisterItemProps) => {
  const [selectedMyStore, setSelectedMyStore] =
    useRecoilState(selectedMyStoreState);

  const handleSelect = () => {
    onSelectStore(store);
    setSelectedMyStore(store);
  };

  const isSelected = selectedMyStore?.storeId === store.storeId;

  return (
    <ListItem isSelected={isSelected} key={index} onClick={handleSelect}>
      <StoreName>{store.storeName}</StoreName>
      <StoreInfo>
        <StoreInfoContent>{store?.storeAddress}</StoreInfoContent>
      </StoreInfo>
    </ListItem>
  );
};

export default StoreRegisterItem;
