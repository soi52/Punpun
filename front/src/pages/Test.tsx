import axios from 'axios';
import Cookies from 'js-cookie';

const TestPage = () => {
  const accessToken = Cookies.get('access_token');
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
