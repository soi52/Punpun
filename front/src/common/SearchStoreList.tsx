import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import FilteredList from './FilteredList';

const ComponentDiv = styled.div``;

const TabList = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
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

interface Store {
  storeId: number;
  name: string;
  latitude: number;
  longitude: number;
}

const SearchStoreList = ({ stores }: { stores: Store[] }) => {
  const [keyword, setKeyword] = useState('');
  const [activeTab, setActiveTab] = useState('asc');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const filteredList = stores
    .filter((item) => item.name.includes(keyword))
    .sort((a, b) => {
      if (activeTab === 'asc') {
        return a.name.localeCompare(b.name);
      } else if (activeTab === 'desc') {
        return b.name.localeCompare(a.name);
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
      <SearchBar value={keyword} onChange={handleInputChange} />
      <FilteredList stores={filteredList} keyword={keyword} />
    </ComponentDiv>
  );
};

export default SearchStoreList;
