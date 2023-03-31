import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 300px;
  overflow-y: auto;
  width: 350px;
`;

const ListItem = styled.li`
  border-bottom: 1px solid #e0e0e0;
  padding: 10px;
  &:last-child {
    border-bottom: none;
  }

  ${StyledLink} {
    text-decoration: none;
  }
`;

const StoreName = styled.h3`
  font-size: 17px;
  margin: 0 0 5px;
  color: black;
  text-decoration-line: none;
`;

// 페이지네이션

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  button {
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 25px;
    color: #333;
    padding: 8px 16px;
    margin: 0 4px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: #f2f2f2;
    }

    &:active {
      background-color: #e0e0e0;
    }

    &[disabled] {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  .active {
    background-color: #333;
    color: white;
  }
`;

type FilteredListProps = {
  stores: Store[];
  keyword: string; // 페이지당 보여줄 아이템 수
};

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

const FilteredList = ({ stores, keyword }: FilteredListProps) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const filteredList = stores.filter((store) =>
    store.storeName.includes(keyword)
  );
  const pageCount = Math.ceil(filteredList.length / itemsPerPage); // 전체 페이지 수

  // 현재 페이지에 해당하는 아이템들만 슬라이스해서 보여줍니다.
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredList.slice(startIndex, endIndex);

  // 페이지 번호 배열 생성
  const pageNumbers = [];
  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

  // 중간 페이지들 출력을 위한 배열 생성
  const midPageNumbers = [];
  let startPage = currentPage - 2;
  let endPage = currentPage + 2;

  if (startPage < 1) {
    startPage = 1;
    endPage = startPage + 4 > pageCount ? pageCount : startPage + 4;
  }

  if (endPage > pageCount) {
    endPage = pageCount;
    startPage = endPage - 4 < 1 ? 1 : endPage - 4;
  }

  for (let i = startPage; i <= endPage; i++) {
    midPageNumbers.push(i);
  }

  return (
    <div>
      <List>
        {currentItems.map((store, index) => (
          <ListItem key={index}>
            <StyledLink to={`/store/${store.storeId}`}>
              <StoreName>{store.storeName}</StoreName>
            </StyledLink>
          </ListItem>
        ))}
      </List>
      {/* 페이지네이션 UI를 만듭니다. */}
      <Pagination>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {currentPage > 3 && (
          <>
            <button onClick={() => setCurrentPage(1)}>1</button>
            {currentPage > 4 && <span>...</span>}
          </>
        )}
        {currentPage > 2 && (
          <button onClick={() => setCurrentPage(currentPage - 1)}>
            {currentPage - 1}
          </button>
        )}
        <button className="active">{currentPage}</button>
        {currentPage < pageCount - 1 && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>
            {currentPage + 1}
          </button>
        )}
        {currentPage < pageCount - 2 && <span>...</span>}
        {currentPage < pageCount - 2 && (
          <button onClick={() => setCurrentPage(pageCount)}>{pageCount}</button>
        )}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === pageCount}
        >
          Next
        </button>
      </Pagination>
    </div>
  );
};

export default FilteredList;
