import { useState } from 'react';
import styled from 'styled-components';
import Dropdown from '../ui/Dropdown';

const NavLi = styled.li`
  margin: 30px;
`;

interface UserTypeSelectorProps {
  onSelect: (item: string) => void;
  items: string[];
  selectedItem: string | undefined;
}

function UserTypeSelector(props: UserTypeSelectorProps) {
  const [drop, setDrop] = useState(false);
  const { onSelect, items, selectedItem } = props;

  return (
    <NavLi onClick={() => setDrop(!drop)}>
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
