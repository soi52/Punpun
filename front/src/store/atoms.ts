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

// 사용자 확인 atom
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

// 리뷰 atom
export interface Reviews {
  id: number;
  userImage: string;
  userName: string;
  reviewText: string;
}

export const reviewState = atom<Reviews[]>({
  key: 'reviewState',
  default: [
    {
      id: 1,
      userImage:
        'https://img2.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/22/koreadognews/20210522152933617uzcd.png',
      userName: '익명의 너구리',
      reviewText: '후원자님 덕분에 너무 맛있게 식사했습니다. 감사합니다!',
    },
    {
      id: 2,
      userImage:
        'https://mblogthumb-phinf.pstatic.net/MjAyMTAyMDRfMjcz/MDAxNjEyNDA5MDEyMjg0.lIRX6wm7X3nPYaviwnUFyLm5dC88Mggadj_nglswSHsg.r9so4CS-g8VZGAoaRWrwmPCIuDOsgsU64fQu0kKQRTwg.JPEG.sunny_side_up12/1612312679152%EF%BC%8D11.jpg?type=w800',
      userName: '익명의 다람쥐',
      reviewText: '눈치보지 않고 따듯한 식사를 할 수 있어서 너무 좋았습니다.',
    },
    {
      id: 3,
      userImage:
        'data:image/jpeg;base64,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',
      userName: '익명의 다람쥐',
      reviewText: '눈치보지 않고 따듯한 식사를 할 수 있어서 너무 좋았습니다.',
    },
  ],
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
