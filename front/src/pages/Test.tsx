import { useEffect } from 'react';
import API from '../store/API';
import Cookies from 'js-cookie';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../store/atoms';
import News from '../common/News';

const TestPage = () => {
  // 요청을 보낼 URL을 지정합니다.
  // const url = 'https://j8d109.p.ssafy.io/api/users/member';

  const apiRequest = () => {
    // API
    //   .get('users/member')
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };
  return (
    <>
      <button onClick={apiRequest}>버튼</button>
      <News/>
    </>
  );
};

export default TestPage;
