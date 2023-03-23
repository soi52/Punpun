import styled from 'styled-components';
import StoreInfo from '../StoreInfo';
import MenuList from './MenuList';

const Wrapper = styled.div`
  padding: 20px;
`;

type Menu = {
  id: number;
  title: string;
  image: string;
  price: number;
};

function Share() {
  const menuList: Menu[] = [
    {
      id: 1,
      title: '메뉴1',
      image: 'https://sample.com/menu1.jpg',
      price: 10000,
    },
    {
      id: 2,
      title: '메뉴2',
      image: 'https://sample.com/menu2.jpg',
      price: 12000,
    },
    {
      id: 3,
      title: '메뉴3',
      image: 'https://sample.com/menu3.jpg',
      price: 15000,
    },
    {
      id: 4,
      title: '메뉴4',
      image: 'https://sample.com/menu4.jpg',
      price: 8000,
    },
    {
      id: 5,
      title: '메뉴5',
      image: 'https://sample.com/menu5.jpg',
      price: 11000,
    },
    {
      id: 6,
      title: '메뉴6',
      image: 'https://sample.com/menu6.jpg',
      price: 9000,
    },
  ];
  return (
    <Wrapper>
      <StoreInfo />
      <h2>오늘의 나눔</h2>
      <MenuList menuList={menuList} />
      <input placeholder="퍈하게 와서 먹고가세요!"></input>
    </Wrapper>
  );
}

export default Share;
