import React, { FC } from 'react';

interface SidebarContentProps {
  menuItems: { title: string; component: FC }[];
  currentMenuItemIndex: number;
  onMenuItemClick: (index: number) => void;
}

const SidebarContent: FC<SidebarContentProps> = ({
  menuItems,
  currentMenuItemIndex,
  onMenuItemClick
}) => {
  return (
    <>
      <ul>
        {menuItems.map((menuItem, index) => (
          <li
            key={index}
            onClick={() => onMenuItemClick(index)}
            style={{
              fontWeight: currentMenuItemIndex === index ? 'bold' : 'normal',
              cursor: 'pointer',
            }}
          >
            {menuItem.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default SidebarContent;
