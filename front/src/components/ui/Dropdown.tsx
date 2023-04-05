import styled from 'styled-components';

const List = styled.ul`
  position: absolute;
  list-style: none;
  top: 100%;
  padding: 0;
  margin: 0;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 1px 0px 5px 2px rgba(0, 0, 0, 0.1);
  z-index: 1;
  pointer: cursor;
`;

const Item = styled.li`
  display: block;
  padding: 0.4rem 1.5rem;
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border-radius: 0.4rem;
  transition: all 200ms linear;

  &:hover,
  &:focus {
    color: #fff;
    background-color: #5d5a88;
    border-radius: 0.4rem;
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
