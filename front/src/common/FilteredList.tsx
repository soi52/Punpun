import React from 'react';

type FilteredListProps = {
  list: string[];
  keyword: string;
};

const FilteredList = ({ list, keyword }: FilteredListProps) => {
  const filteredList = list.filter((item) => item.includes(keyword));

  return (
    <ul>
      {filteredList.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default FilteredList;