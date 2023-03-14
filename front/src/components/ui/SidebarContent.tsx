import React, { FC } from 'react';
import styled from 'styled-components';

const StyledLi = styled.li`
  list-style-type: none;
  display: flex;
  justify-content: center;
`;

interface SidebarContentProps {
  menuItems: { title: string; component: FC }[];
  currentMenuItemIndex: number;
  onMenuItemClick: (index: number) => void;
}

const SidebarContent: FC<SidebarContentProps> = ({
  menuItems,
  currentMenuItemIndex,
  onMenuItemClick,
}) => {
  return (
    <>
      <ul>
        {menuItems.map((menuItem, index) => (
          <StyledLi
            key={index}
            onClick={() => onMenuItemClick(index)}
            style={{
              fontWeight: currentMenuItemIndex === index ? 'bold' : 'normal',
              cursor: 'pointer',
            }}
          >
            {menuItem.title}
          </StyledLi>
        ))}
      </ul>
    </>
  );
};

export default SidebarContent;
