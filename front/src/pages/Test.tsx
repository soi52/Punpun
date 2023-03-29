import { useEffect } from 'react';
import API from '../store/API';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../store/atoms';

const TestPage = () => {
  const accessToken = Cookies.get('accessToken');
  console.log(accessToken);

  // 요청을 보낼 URL을 지정합니다.
  const url = 'https://j8d109.p.ssafy.io/api/stores/test';


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
