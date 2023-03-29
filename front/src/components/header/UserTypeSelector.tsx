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
  userRole: string;
}

function UserTypeSelector(props: UserTypeSelectorProps) {
  const [drop, setDrop] = useState(false);
  const { onSelect, items, selectedItem, userRole } = props;

  return (
    <NavLi onClick={() => userRole === 'OWNER' && setDrop(!drop)}>
      {selectedItem}{' '}
      {drop && userRole === 'OWNER' && (
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
