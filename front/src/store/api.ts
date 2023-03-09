const BASE_URL = 'https://api.coinpaprika.com/v1';

// 오류 방지용 예시 - 추후 API 주소 확인 후 값 불러오기
export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}
