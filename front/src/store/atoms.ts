import { atom } from 'recoil';

// 오류 방지용 예시 - 다크 모드 예시
export const isDarkAtom = atom({
  key: 'isDark',
  default: true,
});

export const accessTokenState = atom<string | null>({
  key: "accessTokenState",
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