import styled from 'styled-components';

const StoreInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  padding: 10px;
  border-radius: 20px;
`;

const StoreName = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const StoreText = styled.p`
  font-size: 16px;
`;

interface StoreItemProps {
  stores: {
    id: number;
    storeName: string;
    storeText: string;
  }[];
}

function StoreListItem({ stores }: StoreItemProps) {
  const reviewList = stores.map((store) => (
    <StoreInfo key={store.id}>
      <div>
        <StoreName>{store.storeName}</StoreName>
        <StoreText>{store.storeText}</StoreText>
      </div>
      <div>
        <button>삭제</button>
      </div>
    </StoreInfo>
  ));

  return <>{reviewList}</>;
}

export default StoreListItem;
