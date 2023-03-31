import { useEffect, useState } from 'react';
import styled from 'styled-components';
import API from '../../../store/API';

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
  background-color: ${({ isLiked }) => (isLiked ? '#ff6b6b' : '#f5f5f5')};
  color: ${({ isLiked }) => (isLiked ? '#fff' : '#333')};
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ isLiked }) => (isLiked ? '#ff3b3b' : '#ddd')};
  }
`;

const CardBody = styled.div`
  padding: 10px;
`;

type MenuType = {
  menuId: number;
  menuName: string;
  storeId: number;
  storeName: string;
};

const LikedMenu = () => {
  const [menus, setMenus] = useState<MenuType[]>([]);
  const [isLiked, setIsLiked] = useState(true);

  const handleDelete = (menuId: number) => {
    setMenus((prev) => prev.filter((menu) => menu.menuId !== menuId)); // 목록에서 해당 메뉴 삭제
  };

  useEffect(() => {
    API.get('favors')
      .then((response) => {
        setMenus(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const toggleLike = (menuId: number) => {
    API.delete('favors', { data: { menuId: menuId } })
      .then(() => {
        handleDelete(menuId); // API 요청이 성공적으로 이루어졌을 때, 목록에서 해당 메뉴를 삭제하기 위해 onDelete 함수 호출
      })
      .catch((error) => {
        console.error(error);
      });
    setIsLiked((prev) => !prev);
  };

  if (menus.length === 0) {
    return(
      <p>아직 선호하는 메뉴가 없어요 :(</p>
    )
  }

  return (
    <MenuList>
      {menus.map((menu) => (
        <Card key={menu.menuId}>
          <CardHeader>
            <h3>{menu.menuName}</h3>
            <LikeButton
              onClick={() => toggleLike(menu.menuId)}
              isLiked={isLiked}
            >
              {isLiked ? '좋아요 취소' : '좋아요'}
            </LikeButton>
          </CardHeader>
          <CardBody>
            <p>{menu.storeName}</p>
          </CardBody>
        </Card>
      ))}
    </MenuList>
  );
};

export default LikedMenu;
