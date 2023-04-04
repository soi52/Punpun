import { useState } from 'react';
import styled from 'styled-components';
import Dropdown from '../ui/Dropdown';

const NavLi = styled.li`
  position: relative;
  margin: 30px;
  text-decoration: none;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 2px;
    background-color: #5D5A88;
    transition: width 0.3s ease-in-out;
  }

  &:hover::before {
    width: 100%;
  }

  &:not(:hover)::before {
    right: 0;
    left: auto;
  }
`;

interface UserTypeSelectorProps {
  onSelect: (item: string) => void;
  items: string[];
  selectedItem: string | undefined;
  role: string;
}

function UserTypeSelector(props: UserTypeSelectorProps) {
  const [drop, setDrop] = useState(false);
  const { onSelect, items, selectedItem, role } = props;

  return (
    <NavLi onClick={() => role === 'OWNER' && setDrop(!drop)}>
      {selectedItem}{' '}
      {drop && (
        <Dropdown
          onSelect={onSelect}
          items={items}
          selectedItem={selectedItem}
        />
      )}
    </NavLi>
  );
}

export default UserTypeSelector;
