import axios from 'axios';

type MenuType = {
  menuId: number;
  menuName: string;
  storeId: number;
  storeName: string;
  storeInfo: string;
};

const LikedMenu = () => {
  axios
    .get('/favors')
    .then((response) => {
      const menus = response.data.map((menu:MenuType) => ({
        menuId: menu.menuId,
        menuName: menu.menuName,
        storeId: menu.storeId,
        storeName: menu.storeName,
        storeInfo: menu.storeInfo,
      }));
      console.log(menus);
    })
    .catch((error) => {
      console.error(error);
    });

  return <></>;
};

export default LikedMenu;
