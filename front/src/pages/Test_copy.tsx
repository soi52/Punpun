import { useEffect } from 'react';
import API from '../store/API';

const Test_copy = () => {
  const apiClient = API();

  useEffect(() => {
    apiClient
      .get('api/stores/test')
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      {/* <button onClick={apiRequest}>버튼</button> */}
      <div>테스트페이지</div>
    </>
  );
};

export default Test_copy;
