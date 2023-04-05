import React, { useState } from 'react';
import styled from 'styled-components';
import StoreData from '../../../common/StoreData.json';
import SearchBar from '../../../common/SearchBar';
import FilteredList from '../../../common/FilteredList';
import SearchStoreList from '../../../common/SearchStoreList';
import API from '../../../store/API';
import { useRecoilValue } from 'recoil';
import { Store, selectedMyStoreState } from '../../../store/atoms';

type StoreSearchModalProps = {
  onClose: () => void;
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 20;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  // align-items: center;
  z-index: 1;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
`;

const ModalButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    color: gray;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StoreSearchModal = (
  { onClose }: StoreSearchModalProps,
  { stores }: { stores: Store[] }
): JSX.Element => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchedList, setSearchedList] = useState<Store[]>([]);
  const selectedMyStore = useRecoilValue(selectedMyStoreState);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchKeyword(event.target.value);
  };

  const searchStores = () => {
    API.get('stores/search', {
      params: {
        name: searchKeyword,
      },
    })
      .then((response: any) => {
        console.log(response.data);
        setSearchedList(response.data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchStores();
  };

  const buttonSearchSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    searchStores();
  };

  const handleSelectedStore = () => {
    console.log(selectedMyStore);
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>가게 검색하기</ModalTitle>
        </ModalHeader>
        <SearchBar
          value={searchKeyword}
          onChange={handleSearchInputChange}
          onSubmit={handleSearchSubmit}
        />
        <button onClick={buttonSearchSubmit}>검색하기</button>
        <FilteredList stores={searchedList} keyword={searchKeyword} />
        <ButtonDiv>
          <ModalButton onClick={onClose}>닫기</ModalButton>
          <ModalButton onClick={handleSelectedStore}>확인</ModalButton>
        </ButtonDiv>
      </ModalContent>
    </ModalOverlay>
  );
};

export default StoreSearchModal;