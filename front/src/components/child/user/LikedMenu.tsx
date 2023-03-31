import { useEffect, useState } from "react";
import styled from "styled-components";
import API from "../../../store/API";

type MenuType = {
  menuId: number;
  menuName: string;
  storeId: number;
  storeName: string;
};

type MenuCardProps = {
  menu: MenuType;
};

const MenuCard = ({ menu }: MenuCardProps) => {
  const [isLiked, setIsLiked] = useState(true);

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <Card>
      <CardHeader>
        <h3>{menu.menuName}</h3>
        <LikeButton onClick={toggleLike} isLiked={isLiked}>
          {isLiked ? "좋아요 취소" : "좋아요"}
        </LikeButton>
      </CardHeader>
      <CardBody>
        <p>{menu.storeName}</p>
      </CardBody>
    </Card>
  );
};

const LikedMenu = () => {
  const [menus, setMenus] = useState<MenuType[]>([]);

  useEffect(() => {
    API.get("/favors")
      .then((response) => {
        const menus = response.data.map((menu: MenuType) => ({
          menuId: menu.menuId,
          menuName: menu.menuName,
          storeId: menu.storeId,
          storeName: menu.storeName,
        }));
        setMenus(menus);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <MenuList>
      {menus.map((menu) => (
        <MenuCard key={menu.menuId} menu={menu} />
      ))}
    </MenuList>
  );
};

const MenuList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const LikeButton = styled.button<{ isLiked: boolean }>`
  background-color: ${({ isLiked }) => (isLiked ? "#ff6b6b" : "#f5f5f5")};
  color: ${({ isLiked }) => (isLiked ? "#fff" : "#333")};
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ isLiked }) => (isLiked ? "#ff3b3b" : "#ddd")};
  }
`;

const CardBody = styled.div`
  padding: 10px;
`;

export default LikedMenu;
