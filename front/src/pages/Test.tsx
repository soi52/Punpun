import axios from "axios";
import Cookies from "js-cookie";

const TestPage = () => {
    const accessToken = Cookies.get('access_token');

    // 요청을 보낼 URL을 지정합니다.
    const url = 'http://172.30.1.43:8888/api/stores/test';

    const apiRequest = () => {
        axios.get(url, {
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
    }
    return(
        <>
          <button onClick={apiRequest}>버튼</button>
        </>
    )
}

export default TestPage;