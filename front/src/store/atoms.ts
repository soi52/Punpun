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

export interface OwStore {
  id: number;
  storeName: string;
  storeText: string;
}

export const owStoreState = atom<OwStore[]>({
  key: 'owStoreState',
  default: [
    {
      id: 1,
      storeName: '스테이크 팩토리1',
      storeText: '항상 후원',
    },
    {
      id: 2,
      storeName: '스테이크 팩토리2',
      storeText: '항상 후원',
    },
    {
      id: 3,
      storeName: '스테이크 팩토리3',
      storeText: '항상 후원',
    },
  ],
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
      latitude: 36.10732937535936,
      longitude: 128.4179093795968,
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
      latitude: 36.1073142218962,
      longitude: 128.41956929817755,
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
      latitude: 36.106694002740824,
      longitude: 128.41848651676423,
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
      latitude: 36.10772768548825,
      longitude: 128.41908811854606,
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
      latitude: 36.10828527784215,
      longitude: 128.41804038999774,
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
      latitude: 36.10788451067159,
      longitude: 128.4185912133032,
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
    {
      storeId: 6,
      name: '동엽 닭갈비',
      latitude: 37.123456,
      longitude: 126.789012,
      hours: {
        weekday: '11:00 - 21:00',
        weekend: '11:00 - 22:00',
      },
      phone: '02-222-2222',
      menu: [
        {
          image: 'https://example.com/food.jpg',
          name: '닭갈비',
          price: 10000,
        },
        {
          image: 'https://example.com/food.jpg',
          name: '닭발',
          price: 7000,
        },
        {
          image: 'https://example.com/food.jpg',
          name: '막국수',
          price: 8000,
        },
        {
          image: 'https://example.com/food.jpg',
          name: '소주',
          price: 4000,
        },
      ],
    },
    {
      storeId: 7,
      name: '진성 삼겹살',
      latitude: 37.123456,
      longitude: 126.789012,
      hours: {
        weekday: '12:00 - 23:00',
        weekend: '12:00 - 23:30',
      },
      phone: '02-333-3333',
      menu: [
        {
          image: 'https://example.com/food.jpg',
          name: '삼겹살',
          price: 15000,
        },
        {
          image: 'https://example.com/food.jpg',
          name: '목살',
          price: 16000,
        },
        {
          image: 'https://example.com/food.jpg',
          name: '김치찌개',
          price: 6000,
        },
        {
          image: 'https://example.com/food.jpg',
          name: '맥주',
          price: 5000,
        },
      ],
    },
    {
      storeId: 8,
      name: '종현 네일샵',
      latitude: 37.5666103,
      longitude: 126.9783882,
      hours: {
        weekday: '10:00 - 21:00',
        weekend: '11:00 - 20:00',
      },
      phone: '02-222-2222',
      menu: [
        {
          image: 'https://example.com/nail.jpg',
          name: '매니큐어',
          price: 20000,
        },
        {
          image: 'https://example.com/nail.jpg',
          name: '페디큐어',
          price: 25000,
        },
        {
          image: 'https://example.com/nail.jpg',
          name: '젤네일',
          price: 40000,
        },
        {
          image: 'https://example.com/nail.jpg',
          name: '스킨케어',
          price: 35000,
        },
      ],
    },
    {
      storeId: 9,
      name: '서정 버블티',
      latitude: 37.48202466257939,
      longitude: 126.98199426920692,
      hours: {
        weekday: '12:00 - 22:00',
        weekend: '12:00 - 23:00',
      },
      phone: '02-333-3333',
      menu: [
        {
          image: 'https://example.com/bubble-tea.jpg',
          name: '흑당 버블티',
          price: 5500,
        },
        {
          image: 'https://example.com/bubble-tea.jpg',
          name: '딸기 요거트 버블티',
          price: 6000,
        },
        {
          image: 'https://example.com/bubble-tea.jpg',
          name: '망고 스무디',
          price: 6500,
        },
        {
          image: 'https://example.com/bubble-tea.jpg',
          name: '초코 밀크티',
          price: 5000,
        },
      ],
    },
    {
      storeId: 10,
      name: '성민 예뻐질래쉬',
      latitude: 37.47620640666068,
      longitude: 126.9859517419084,
      hours: {
        weekday: '11:00 - 20:00',
        weekend: '11:00 - 19:00',
      },
      phone: '02-444-4444',
      menu: [
        {
          image: 'https://example.com/lash-extensions.jpg',
          name: '속눈썹 연장',
          price: 70000,
        },
        {
          image: 'https://example.com/lash-extensions.jpg',
          name: '볼륨 래쉬',
          price: 80000,
        },
        {
          image: 'https://example.com/lash-extensions.jpg',
          name: '속눈썹 펌',
          price: 60000,
        },
        {
          image: 'https://example.com/lash-extensions.jpg',
          name: '마스카라 래쉬',
          price: 50000,
        },
      ],
    },
  ],
});
