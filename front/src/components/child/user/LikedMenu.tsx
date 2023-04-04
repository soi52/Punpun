import { useEffect, useState } from 'react';
import styled from 'styled-components';
import API from '../../../store/API';
import { useNavigate } from 'react-router';

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
  &:hover {
    // background-color: #ff3b3b;
    // opacity: 0.8;
    transform: scale(1.05);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const LikeButton = styled.button`
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #ff3b3b;
    opacity: 0.8;
    transform: scale(1.05);
  }
`;

const CardBody = styled.div`
  padding: 10px;
`;

const StoreName = styled.p`
  // font-weight: bold;
  cursor: pointer;
  &:hover {
    // background-color: #ff3b3b;
    opacity: 0.8;
    transform: scale(1.01);
  }
`;

type MenuType = {
  menuId: number;
  menuName: string;
  storeId: number;
  storeName: string;
};

const LikedMenu = () => {
  const [menus, setMenus] = useState<MenuType[]>([]);
  // const [isLiked, setIsLiked] = useState(true);

  const Navigate = useNavigate();
  const toStore = (storeId: number) => {
    Navigate(`/store/${storeId}`);
  };

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
  }, []);

  const toggleLike = (menuId: number) => {
    API.delete('favors', { data: { menuId: menuId } })
      .then(() => {
        handleDelete(menuId); // API 요청이 성공적으로 이루어졌을 때, 목록에서 해당 메뉴를 삭제하기 위해 onDelete 함수 호출
        console.log('선호 메뉴 삭제 완');
      })
      .catch((error) => {
        console.error(error);
      });
    // setIsLiked((prev) => !prev);
  };

  if (menus.length === 0) {
    return <p>아직 선호하는 메뉴가 없어요 :(</p>;
  }

  return (
    <MenuList>
      {menus.map((menu) => (
        <Card key={menu.menuId}>
          <CardHeader>
            <h3>{menu.menuName}</h3>
            <LikeButton onClick={() => toggleLike(menu.menuId)}>
              {/* {isLiked ?  */}
              좋아요 취소
              {/* //  : '좋아요'} */}
            </LikeButton>
          </CardHeader>
          <CardBody>
            <StoreName onClick={() => toStore(menu.storeId)}>
              {menu.storeName}
            </StoreName>
          </CardBody>
        </Card>
      ))}
    </MenuList>
  );
};

export default LikedMenu;
