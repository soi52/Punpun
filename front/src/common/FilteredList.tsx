import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Store, isRegisterState, selectedMyStoreState } from '../store/atoms';
import StoreRegisterItem from '../components/owner/store/StoreRegisterItem';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const List = styled.ul`
  list-style: none;
  margin: 20px;
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

const FilteredList = ({ stores, keyword }: FilteredListProps) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const isRegister = useRecoilValue(isRegisterState);
  const [selectedMyStore, setSelectedMyStore] =
    useRecoilState(selectedMyStoreState);

  const filteredList = stores.filter((store) =>
    store.storeName.includes(keyword)
  );
  const pageCount = Math.ceil(filteredList.length / itemsPerPage); // 전체 페이지 수

  // 페이지네이션 UI에 표시할 페이지 버튼 수
  const maxPageButtons = 3;

  // 현재 페이지에 해당하는 아이템들만 슬라이스해서 보여줍니다.
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredList.length);
  const currentItems = filteredList.slice(startIndex, endIndex);

  const handleSelectStore = (store: Store | null) => {
    setSelectedMyStore(store);
  };

  useEffect(() => {
    console.log(isRegister);
  }, []);

  // 페이지네이션 UI를 만듭니다.
  const getPageButtons = () => {
    const pageButtons = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(pageCount, startPage + maxPageButtons - 1);
    for (let page = startPage; page <= endPage; page++) {
      pageButtons.push(
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={currentPage === page ? 'active' : ''}
        >
          {page}
        </button>
      );
    }
    if (startPage > 1) {
      if (startPage > 2) {
        pageButtons.unshift(<span key="ellipsis-start">...</span>);
      }
      pageButtons.unshift(
        <button key="1" onClick={() => setCurrentPage(1)}>
          1
        </button>
      );
    }
    if (endPage < pageCount) {
      if (endPage < pageCount - 1) {
        pageButtons.push(<span key="ellipsis-end">...</span>);
      }
      pageButtons.push(
        <button key={pageCount} onClick={() => setCurrentPage(pageCount)}>
          {pageCount}
        </button>
      );
    }
    return pageButtons;
  };

  return (
    <Wrapper>
      {isRegister ? (
        <List>
          {currentItems.map((store, index) => (
            <StoreRegisterItem
              key={index}
              store={store}
              index={index}
              onSelectStore={handleSelectStore}
              selectedMyStore={selectedMyStore}
            />
          ))}
        </List>
      ) : (
        <List>
          {currentItems.map((store, index) =>
            window.location.href.includes('register') ? (
              <ListItem key={index}>
                <StoreName>{store.storeName}</StoreName>
              </ListItem>
            ) : (
              <ListItem key={index}>
                <StyledLink to={`/store/${store.storeId}`}>
                  <StoreName>{store.storeName}</StoreName>
                </StyledLink>
              </ListItem>
            )
          )}
        </List>
      )}
      {/* 페이지네이션 UI를 만듭니다. */}
      <Pagination>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {getPageButtons()}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === pageCount}
        >
          Next
        </button>
      </Pagination>
    </Wrapper>
  );
};

export default FilteredList;
