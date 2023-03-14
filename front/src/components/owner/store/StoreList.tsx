import styled from 'styled-components';
import StoreListItem from './StoreListItem';

const Wrapper = styled.div`
  padding: 20px;
`;

function StoreList() {
  const stores = [
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
  ];
  return (
    <Wrapper>
      <h1>가맹점 목록</h1>
      <StoreListItem stores={stores} />
    </Wrapper>
  );
}
export default StoreList;
