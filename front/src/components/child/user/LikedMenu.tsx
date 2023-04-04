import { useEffect, useState } from 'react';
import styled from 'styled-components';
import API from '../../../store/API';
import { useNavigate } from 'react-router';
import defaultMenuImage from '../../../resources/images/profileDefault.png';

const MenuList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
`;

const MenuCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 16px;
  max-width: 175px;
  width: 100%;
  height: 200px;
  cursor: pointer;
  transition: transform 0.75s ease, opacity 0.2s ease;
  perspective: 1000px;
  transform-style: preserve-3d;
  position: relative;
  &:hover {
    transform: rotateY(180deg);
  }
  margin: 0.5rem 1rem 1rem 0.5rem;
`;

const MenuCardFront = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MenuCardBack = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: #e7e6f2;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: rotateY(180deg);
`;

const MenuCardImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
`;

const MenuCardTitle = styled.h4`
  margin: 10px 0px 5px 0px;
  text-align: center;
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
  // padding: 10px;
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
  menuImageName: string | null;
  menuImage: string | null;
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
        <MenuCard key={menu.menuId}>
          <MenuCardFront>
              <MenuCardImage
                src={menu.menuImage || defaultMenuImage}
                alt={menu.menuName}
              />
              <MenuCardTitle>{menu.menuName}</MenuCardTitle>
          </MenuCardFront>
          <MenuCardBack>
              <LikeButton onClick={() => toggleLike(menu.menuId)}>
                {/* {isLiked ?  */}
                좋아요 취소
                {/* //  : '좋아요'} */}
              </LikeButton>
            <CardBody>
              <StoreName onClick={() => toStore(menu.storeId)}>
                {menu.storeName}
              </StoreName>
            </CardBody>
          </MenuCardBack>
        </MenuCard>
      ))}
    </MenuList>
  );
};

export default LikedMenu;
