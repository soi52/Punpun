import Cookies from 'js-cookie';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// token
export const accessTokenState = atom({
  key: 'accessTokenState',
  default: Cookies.get('accessToken') || '',
});

export const refreshTokenState = atom({
  key: 'refreshTokenState',
  default: Cookies.get('refreshToken') || '',
});

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: Cookies.get('accessToken') !== undefined,
});

export const addressState = atom<string>({
  key: 'addressState',
  default: '',
});

export const userAreaState = atom<string>({
  key: 'userAreaState',
  default: '',
});

export interface UserInfo {
  userId: number;
  userName: string;
  userEmail: string;
  userRole: string;
  userNumber: string;
  userSupportedPoint: number | null;
  userRemainPoint: number | null;
  userArea: string | null;
  userProfileName: string | null;
  userProfileImage: string | null;
}

export const userInfoState = atom<UserInfo>({
  key: 'userInfoState',
  default: {
    userId: 0,
    userName: '',
    userEmail: '',
    userRole: '',
    userNumber: '',
    userSupportedPoint: 0,
    userRemainPoint: 0,
    userArea: '',
    userProfileName: '',
    userProfileImage: '',
  },
});

export const LoginState = atom<boolean>({
  key: 'LoginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

// 오류 방지용 예시 - 다크 모드 예시
export const isDarkAtom = atom({
  key: 'isDark',
  default: true,
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

export const usePointState = atom<number>({
  key: 'usePointState',
  default: 0,
});

// 사용자 확인 atom
export const isChildState = atom<Boolean>({
  key: 'isChildState',
  default: false,
});

export const isSupporterState = atom<Boolean>({
  key: 'isSupporterState',
  default: true,
});

export const isOwnerState = atom<Boolean>({
  key: 'isOwnerState',
  default: false,
});

export const isRegisterState = atom<Boolean>({
  key: 'isRegisterState',
  default: false,
});

// 리뷰 atom
export interface Reviews {
  id: number;
  userImage: string;
  userName: string;
  reviewText: string;
}

export interface Store {
  storeId: number;
  storeName: string;
  storeOpenTime: string | null;
  storeInfo: string | null;
  storeAddress: string;
  storeLon: number;
  storeLat: number;
  storeImageName: string | null;
  storeImage: string | null;
  storePhoneNumber: string | null;
  // storeAlwaysShare: Boolean;
  menuDTO: MenuDTO[];
}

export interface OwStoreUpdate {
  storeId: number;
  storeName: string;
  storeOpenTime: string | null;
  storeInfo: string | null;
  storeAddress: string;
  storePhoneNumber: string | null;
  storeAlwaysShare: Boolean;
}

export type MenuDTO = {
  menuId: number;
  menuName: string;
  menuPrice: number;
  menuCount: number;
  menuImage: string;
  menuImageName: string;
};

export const owStoreState = atom<Store[]>({
  key: 'owStoreState',
  default: [],
});

export const selectedMyStoreState = atom<Store | null>({
  key: 'selectedMyStoreState',
  default: null,
});

export const updatedStoreState = atom<OwStoreUpdate | Store | null>({
  key: 'updatedStoreState',
  default: null,
});

export const isUpdatedState = atom<Boolean>({
  key: 'isUpdatedState',
  default: false,
});

export const isRegisterStoreState = atom<Boolean>({
  key: 'isRegisterStoreState',
  default: false,
});

export const selectedStoreState = atom<Store | null>({
  key: 'selectedStoreState',
  default: null,
});

export const owStoreMenuState = atom({
  key: 'owStoreMenuState',
  default: [],
});

export interface MenuSupport {
  supportId: null | number;
  supportType: string;
  supportDate: string;
  menuId: number;
  menuName: string;
  totalCount: number;
  useCount: number;
}

export const ShareListState = atom<MenuSupport[]>({
  key: 'ShareListState',
  default: [],
});

export const tokenState = atom<String>({
  key: 'tokenState',
  default: '',
});
