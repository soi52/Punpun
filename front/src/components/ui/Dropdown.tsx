import styled from 'styled-components';

const List = styled.ul`
  position: absolute;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;

interface DropdownProps {
  onSelect: (item: string) => void;
  items: string[];
  selectedItem: string;
}

function Dropdown(props: DropdownProps) {
  const { onSelect, items, selectedItem } = props;
  const renderItems = () => {
    return items.map((item) => (
      <Item key={item} onClick={() => onSelect(item)}>
        {item}
      </Item>
    ));
  };
  return (
    <List>
      {selectedItem === '후원자' && renderItems()}
      {selectedItem === '사장님' && renderItems()}
    </List>
  );
}

export default Dropdown;
