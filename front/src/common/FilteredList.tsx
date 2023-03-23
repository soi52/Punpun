import React from 'react';
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
`;

const ListItem = styled.li`
  border-bottom: 1px solid #e0e0e0;
  padding: 16px;
  &:last-child {
    border-bottom: none;
  }

  ${StyledLink} {
    text-decoration: none;
  }
`;

const StoreName = styled.h3`
  font-size: 18px;
  margin: 0 0 8px;
  color: black;
  text-decoration-line: none;
`;

type FilteredListProps = {
  stores: Store[];
  keyword: string;
};

interface Store {
  storeId: number;
  name: string;
  latitude: number;
  longitude: number;
}

const FilteredList = ({ stores, keyword }: FilteredListProps) => {
  const filteredList = stores.filter((store) => store.name.includes(keyword));

  return (
    <List>
      {filteredList.map((store, index) => (
        <ListItem key={index}>
          <StyledLink to={`/store/${store.storeId}`}>
            <StoreName>{store.name}</StoreName>
          </StyledLink>
        </ListItem>
      ))}
    </List>
  );
};

export default FilteredList;
