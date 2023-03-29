import styled from 'styled-components';

const List = styled.ul`
  position: absolute;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  z-index: 1;
  padding: 10px;
`;

const Item = styled.li`
  cursor: pointer;
  list-style: none;

  &:hover {
    color: white;
    background-color: #3f51b5;
  }
`;

interface DropdownProps {
  onSelect: (item: string) => void;
  items: string[];
  selectedItem: string | undefined; // 선택된 아이템의 타입을 string | undefined로 변경
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
