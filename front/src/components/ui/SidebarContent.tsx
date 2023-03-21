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
      {menuItems.map((menuItem, index) =>
        index !== 3 ? (
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
        ) : (
          ''
        )
      )}
    </>
  );
};

export default SidebarContent;
