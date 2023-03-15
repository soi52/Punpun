// import styled from 'styled-components';

// const StoreInfo = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin: 10px;
//   padding: 10px;
//   border-radius: 20px;
// `;

// const StoreName = styled.span`
//   font-weight: bold;
//   margin-right: 10px;
// `;

// const StoreText = styled.p`
//   font-size: 16px;
// `;

// interface StoreItemProps {
//   stores: {
//     id: number;
//     storeName: string;
//     storeText: string;
//   }[];
// }

// function StoreListItem({ stores }: StoreItemProps) {
//   const reviewList = stores.map((store) => (
//     <StoreInfo key={store.id}>
//       <div>
//         <StoreName>{store.storeName}</StoreName>
//         <StoreText>{store.storeText}</StoreText>
//       </div>
//       <div>
//         <button>삭제</button>
//       </div>
//     </StoreInfo>
//   ));

//   return <>{reviewList}</>;
// }

// export default StoreListItem;
import React from 'react';
import styled from 'styled-components';

interface Store {
  id: number;
  storeName: string;
  storeText: string;
}

interface StoreItemProps {
  stores: Store[];
  onDelete: (id: number) => void;
}

const StoreInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  padding: 15px;
  border-radius: 20px;
  background-color: #ffffff;
`;

const StoreName = styled.span`
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
  color: #333;
`;

const StoreText = styled.p`
  font-size: 16px;
  color: #666;
`;

const DeleteButton = styled.button`
  font-size: 16px;
  color: #fff;
  background-color: #f44336;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
`;

function StoreListItem({ stores, onDelete }: StoreItemProps) {
  const handleDelete = (id: number) => {
    onDelete(id);
  };

  const reviewList = stores.map((store) => (
    <StoreInfo key={store.id}>
      <div>
        <StoreName>{store.storeName}</StoreName>
        <StoreText>
          {store.storeText}
          <input type="checkbox" />
        </StoreText>
      </div>
      <div>
        <button onClick={() => handleDelete(store.id)}>삭제</button>
      </div>
    </StoreInfo>
  ));

  return <>{reviewList}</>;
}

export default StoreListItem;
