import 'styled-components';

// 전체 페이지에 적용할 수 있는 CSS = typescript이므로 자료형을 알려주어야 함
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
  }
}
