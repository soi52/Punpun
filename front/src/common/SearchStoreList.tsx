import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import FilteredList from './FilteredList';
import API from '../store/API';

const ComponentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 63vh;
`;

const TabList = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  width: 100%;
`;

const TabButton = styled.button<{ isActive: boolean }>`
  position: relative;
  padding: 10px 30px;
  font-size: 14px;
  font-weight: bold;
  color: ${({ isActive }) => (isActive ? '#333' : '#999')};
  background-color: ${({ isActive }) => (isActive ? '#fff' : '#f8f8f8')};
  border: none;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    color: #333;
  }
  &::before {
    content: '';
    position: absolute;
    top: -14px;
    left: 50%;
    font-size: 10px;
    transform: translateX(-50%);
  }
`;

const SearchBarDiv = styled.div`
  padding-bottom: 10px;
`;

type MenuDTO = {
  menuId: number;
  menuName: string;
  menuPrice: number;
  menuCount: number;
};

type Store = {
  storeId: number;
  storeName: string;
  storeOpenTime: string | null;
  storeInfo: string | null;
  storeAddress: string;
  storeLon: number;
  storeLat: number;
  storeImageName: string | null;
  storeImage: string | null;
  storePhoneNumber: string | null;
  menuDTOList: MenuDTO[];
};

const SearchStoreList = ({ stores }: { stores: Store[] }) => {
  const [keyword, setKeyword] = useState('');
  const [activeTab, setActiveTab] = useState('asc');
  const [searchedList, setSearchedList] = useState<Store[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const searchStores = () => {
    API.get('stores/search', {
      params: {
        name: keyword,
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

  const filteredList =
    searchedList.length > 0
      ? searchedList
      : stores
          .filter((item) => item.storeName.includes(keyword))
          .sort((a, b) => {
            if (activeTab === 'asc') {
              return a.storeName.localeCompare(b.storeName);
            } else if (activeTab === 'desc') {
              return b.storeName.localeCompare(a.storeName);
            } else {
              return 0;
            }
          });

  return (
    <ComponentDiv>
      <TabList>
        <TabButton
          isActive={activeTab === 'asc'}
          onClick={() => setActiveTab('asc')}
        >
          오름차순
        </TabButton>
        <TabButton
          isActive={activeTab === 'desc'}
          onClick={() => setActiveTab('desc')}
        >
          내림차순
        </TabButton>
      </TabList>
      <SearchBarDiv>
        <SearchBar
          value={keyword}
          onChange={handleInputChange}
          onSubmit={handleSearchSubmit}
        />
      </SearchBarDiv>
      <FilteredList stores={filteredList} keyword={keyword} />
    </ComponentDiv>
  );
};

export default SearchStoreList;
