import { useEffect } from 'react';
import API from '../store/API';
import axios from 'axios';
import Cookies from 'js-cookie';

import { useRecoilState } from 'recoil';
import { pointState } from '../store/atoms';

const TestPage = () => {
  const [point, setPoint] = useRecoilState(pointState);

  const accessToken = Cookies.get('accessToken');
  console.log(accessToken);

  // 요청을 보낼 URL을 지정합니다.
  const url = 'https://j8d109.p.ssafy.io/api/stores/test';

  useEffect(() => {
    API
      .get('payments')
      .then((response) => {
        console.log(response.data);
        setPoint(response.data.memberPoint);
      })
      .catch((error) => {
        console.log(error);
      });
  })

  const apiRequest = () => {
    axios
      .get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <button onClick={apiRequest}>버튼</button>
    </>
  );
};

export default TestPage;
