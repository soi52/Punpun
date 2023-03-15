import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  border: none;
  border-radius: 25px;
  background-color: hsl(0, 0%, 90%);
  padding: 10px;
  font-size: medium;
  width: 15rem;
`;

type SearchBarProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};


const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <Input
    type="text"
    value={value}
    onChange={onChange}
    placeholder="가게명을 입력해주세요."
  />
);

export default SearchBar;