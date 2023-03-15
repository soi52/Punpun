// import styled from 'styled-components';

// const Box = styled.div`
//   position: absolute;
// `;

// function Dropdown() {
//   return (
//     <Box>
//       <li>사장님</li>
//     </Box>
//   );
// }

// export default Dropdown;

// const Box = styled.div`
//   position: absolute;
//   top: 40px;
//   background-color: #fff;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
//   z-index: 1;
// `;
import styled from 'styled-components';

const List = styled.ul`
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

const Box = styled.div`
  position: absolute;
`;

interface DropdownProps {
  onSelect: (item: string) => void;
}
function Dropdown(props: DropdownProps) {
  return (
    <Box>
      <List>
        <Item onClick={() => props.onSelect('사장님')}>사장님</Item>
        <Item onClick={() => props.onSelect('후원자')}>후원자</Item>
      </List>
    </Box>
  );
}

export default Dropdown;
