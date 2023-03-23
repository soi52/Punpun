import { useState } from 'react';
import styled from 'styled-components';

function MenuDropdown() {
  return;
}
//   props: MenuListProps,
//   { selectedMenus, onQuantityChange, onClearClick }: SelectedMenuListProps
// ) => {
//   const { menuList } = props;
//   const [selectedMenus, setSelectedMenus] = useState<Menu[]>([]);

//   const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedId = parseInt(event.target.value);
//     const selectedMenu = menuList.find((menu) => menu.id === selectedId);
//     if (selectedMenu) {
//       setSelectedMenus((prev) => [...prev, { ...selectedMenu, quantity: 1 }]);
//     }
//   };

//   const handleRemoveClick = (menu: Menu) => {
//     setSelectedMenus((prev) => prev.filter((item) => item.id !== menu.id));
//   };

//   const handleQuantityChange = (id: number, quantity: number) => {
//     setSelectedMenus((prev) =>
//       prev.map((item) => (item.id === id ? { ...item, quantity } : item))
//     );
//   };

//   return (
//     <Wrapper>
//       <label>Menu List</label>
//       <Select onChange={handleSelectChange}>
//         <option value="" disabled selected hidden>
//           메뉴를 선택하세요.
//         </option>
//         {menuList.map((menu) => (
//           <option key={menu.id} value={menu.id}>
//             {menu.title} ({menu.price}원)
//           </option>
//         ))}
//       </Select>
//       <SelectedMenuList>
//         {selectedMenus.map((menu) => (
//           <SelectedMenu
//             key={menu.id}
//             id={menu.id}
//             title={menu.title}
//             price={menu.price}
//             quantity={menu.quantity}
//             onQuantityChange={handleQuantityChange}
//             onDelete={() => handleRemoveClick(menu)}
//           />
//         ))}
//       </SelectedMenuList>
//     </Wrapper>
//   );
// }

export default MenuDropdown;
// interface MenuListProps {
//   menuList: Menu[];
// }

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Select = styled.select`
//   width: 100%;
//   margin-top: 8px;
//   padding: 8px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const SelectedMenuList = styled.ul`
//   list-style: none;
//   margin: 0;
//   padding: 0;
//   width: 100%;
// `;

// const SelectedMenuListItem = styled.li`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 8px;
//   background-color: #f7f7f7;
//   margin-top: 8px;
//   border-radius: 4px;
// `;

// const RemoveButton = styled.button`
//   background-color: #dc3545;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   padding: 8px;
//   cursor: pointer;
// `;

// function MenuList(props: MenuListProps) {
//   const { menuList } = props;
//   const [selectedMenus, setSelectedMenus] = useState<Menu[]>([]);

//   const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedId = parseInt(event.target.value);
//     const selectedMenu = menuList.find((menu) => menu.id === selectedId);
//     if (selectedMenu) {
//       setSelectedMenus((prev) => [...prev, selectedMenu]);
//     }
//   };

//   const handleRemoveClick = (menu: Menu) => {
//     setSelectedMenus((prev) => prev.filter((item) => item.id !== menu.id));
//   };

//   return (
//     <Wrapper>
//       <label>Menu List</label>
//       <Select onChange={handleSelectChange}>
//         <option value="" disabled selected hidden>
//           메뉴를 선택하세요.
//         </option>
//         {menuList.map((menu) => (
//           <option key={menu.id} value={menu.id}>
//             {menu.title} ({menu.price}원)
//           </option>
//         ))}
//       </Select>
//       <SelectedMenuList>
//         {selectedMenus.map((menu) => (
//           <SelectedMenuListItem key={menu.id}>
//             <SelectedMenu
//               id={menu.id}
//               title={menu.title}
//               price={menu.price}
//               quantity={menu.quantity}
//               onQuantityChange={(quantity) =>
//                 handleQuantityChange(menu, quantity)
//               }
//               onDelete={() => handleRemoveClick(menu)}
//             />
//           </SelectedMenuListItem>
//         ))}
//       </SelectedMenuList>
//     </Wrapper>
//   );
// }

// export default MenuList;
