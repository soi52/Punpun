import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import FilteredList from './FilteredList';
import API from '../store/API';
import { Store } from '../store/types';

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

const SearchStoreList = ({ stores }: { stores: Store[] }) => {
  const [keyword, setKeyword] = useState('');
  const [activeTab, setActiveTab] = useState<'search' | 'filter'>('search');
  const [searchedList, setSearchedList] = useState<Store[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

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

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    searchStores();
  };

  const filteredList = stores
    .filter((item) => item.storeName.includes(keyword))
    .sort((a, b) => {
      return a.storeName.localeCompare(b.storeName);
      // if (activeTab === 'asc') {
      //   return a.storeName.localeCompare(b.storeName);
      // } else if (activeTab === 'desc') {
      //   return b.storeName.localeCompare(a.storeName);
      // } else {
      //   return 0;
      // }
    });

  return (
    <ComponentDiv>
      <TabList>
        <TabButton
          isActive={activeTab === 'search'}
          onClick={() => setActiveTab('search')}
        >
          가게 검색하기
        </TabButton>
        <TabButton
          isActive={activeTab === 'filter'}
          onClick={() => setActiveTab('filter')}
        >
          내 주변 가게 보기
        </TabButton>
      </TabList>
      <SearchBarDiv>
        {activeTab === 'search' ? (
          <SearchBar
            value={searchKeyword}
            onChange={handleSearchInputChange}
            onSubmit={handleSearchSubmit}
          />
        ) : (
          <SearchBar
            value={keyword}
            onChange={handleInputChange}
            onSubmit={handleSearchSubmit}
          />
        )}
      </SearchBarDiv>
      <FilteredList
        stores={activeTab === 'search' ? searchedList : filteredList}
        keyword={activeTab === 'search' ? searchKeyword : keyword}
      />
    </ComponentDiv>
  );
};

export default SearchStoreList;
