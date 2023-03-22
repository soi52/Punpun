import { atom } from 'recoil';

// 오류 방지용 예시 - 다크 모드 예시
export const isDarkAtom = atom({
  key: 'isDark',
  default: true,
});

export const accessTokenState = atom<string | null>({
  key: 'accessTokenState',
  default: null,
});

export const messageState = atom<string>({
  key: 'messageState',
  default: '',
});

// 포인트 atom
export const pointState = atom<number>({
  key: 'pointState',
  default: 0,
});

export const isChildState = atom<Boolean>({
  key: 'isChildState',
  default: false,
});

export const isOwnerState = atom<Boolean>({
  key: 'isOwnerState',
  default: false,
});

export const isSupporterState = atom<Boolean>({
  key: 'isSupporterState',
  default: true,
});

export interface Store {
  storeId: number;
  name: string;
  latitude: number;
  longitude: number;
  hours: { weekday: string; weekend: string };
  phone: string;
  menu: { image: string; name: string; price: number }[];
}

export const storeState = atom<Store[]>({
  key: 'storeState',
  default: [
    {
      storeId: 0,
      name: '싸피자',
      latitude: 37.497175,
      longitude: 127.027926,
      hours: {
        weekday: '10:00 - 22:00',
        weekend: '11:00 - 23:00',
      },
      phone: '02-123-4567',
      menu: [
        {
          image: 'https://example.com/pizza.jpg',
          name: '페퍼로니피자',
          price: 15000,
        },
        {
          image: 'https://example.com/pizza.jpg',
          name: '치즈피자',
          price: 12000,
        },
        {
          image: 'https://example.com/pizza.jpg',
          name: '고구마피자',
          price: 18000,
        },
      ],
    },
    {
      storeId: 1,
      name: '싸피식당',
      latitude: 37.497732,
      longitude: 127.028981,
      hours: {
        weekday: '08:00 - 21:00',
        weekend: '09:00 - 22:00',
      },
      phone: '02-123-4568',
      menu: [
        {
          image: 'https://example.com/food.jpg',
          name: '김치찌개',
          price: 8000,
        },
        {
          image: 'https://example.com/food.jpg',
          name: '된장찌개',
          price: 8000,
        },
        {
          image: 'https://example.com/food.jpg',
          name: '제육볶음',
          price: 10000,
        },
      ],
    },
    {
      storeId: 2,
      name: '싸피햄버거',
      latitude: 37.497419,
      longitude: 127.027166,
      hours: {
        weekday: '11:00 - 23:00',
        weekend: '11:00 - 23:00',
      },
      phone: '02-123-4569',
      menu: [
        {
          image: 'https://example.com/burger.jpg',
          name: '치즈버거',
          price: 6000,
        },
        {
          image: 'https://example.com/burger.jpg',
          name: '불고기버거',
          price: 7000,
        },
        {
          image: 'https://example.com/burger.jpg',
          name: '치킨버거',
          price: 7000,
        },
      ],
    },
    {
      storeId: 3,
      name: '싸이버거',
      latitude: 37.497289,
      longitude: 127.027721,
      hours: {
        weekday: '10:00 - 22:00',
        weekend: '11:00 - 23:00',
      },
      phone: '02-123-4567',
      menu: [
        {
          image: 'https://example.com/food.jpg',
          name: '치즈버거',
          price: 5000,
        },
        {
          image: 'https://example.com/food.jpg',
          name: '불고기버거',
          price: 6000,
        },
        {
          image: 'https://example.com/food.jpg',
          name: '치킨버거',
          price: 5500,
        },
      ],
    },
    {
      storeId: 4,
      name: '정은치킨',
      latitude: 37.496556,
      longitude: 127.028533,
      hours: {
        weekday: '11:00 - 22:00',
        weekend: '11:30 - 22:30',
      },
      phone: '02-123-4569',
      menu: [
        {
          image: 'https://example.com/food.jpg',
          name: '후라이드치킨',
          price: 15000,
        },
        {
          image: 'https://example.com/food.jpg',
          name: '양념치킨',
          price: 17000,
        },
        {
          image: 'https://example.com/food.jpg',
          name: '간장치킨',
          price: 18000,
        },
      ],
    },
    {
      storeId: 5,
      name: '햇살카페',
      latitude: 37.496951,
      longitude: 127.029369,
      hours: {
        weekday: '08:00 - 22:00',
        weekend: '09:00 - 23:00',
      },
      phone: '02-111-1111',
      menu: [
        {
          image: 'https://example.com/food.jpg',
          name: '아메리카노',
          price: 3500,
        },
        {
          image: 'https://example.com/food.jpg',
          name: '카페라떼',
          price: 4000,
        },
        {
          image: 'https://example.com/food.jpg',
          name: '카푸치노',
          price: 4000,
        },
        {
          image: 'https://example.com/food.jpg',
          name: '과일주스',
          price: 5000,
        },
        {
          image: 'https://example.com/food.jpg',
          name: '치즈케이크',
          price: 6000,
        },
      ],
    },
  ],
});
