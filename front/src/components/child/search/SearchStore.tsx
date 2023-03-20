import styled from 'styled-components';

import Map from '../../../common/Map';
import SearchStoreList from '../../../common/SearchStoreList';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const SearchStore = () => {
  const list = [
    '싸피자',
    '싸피식당',
    '싸피햄버거',
    '싸이버거',
    '정은치킨',
    '햇살카페',
  ];

  return (
    <Wrapper>
      <Map />
      <SearchStoreList list={list} />
    </Wrapper>
  );
};

export default SearchStore;
