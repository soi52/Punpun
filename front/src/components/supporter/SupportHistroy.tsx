import { useEffect, useState } from 'react';
import API from '../../store/API';
import styled from 'styled-components';

const Wrapper = styled.div`
    display; flex;
    align-items: center;
    margin: 30px;
`;

const PostIt = styled.div`
  position: relative;
  width: 90%;
  // height: 200px;
  background-color: #fcfcff;
  //   border: 2px solid #ffd700;
  border-radius: 5px;
  margin: 10px;
  padding: 20px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`;

const StoreName = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const ReservationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const SupportInfo = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

const IdDiv = styled.div`
  text-align: right;
`;

const SupportId = styled.span`
  font-weight: bold;
`;

const MenuInfo = styled.div`
  margin-bottom: 5px;
`;

const HrDiv = styled.hr`
  margin-bottom: 30px;
`;

interface SupportData {
  supportId: number;
  supportState: string;
  supportCreationDate: string;
  storeId: number;
  storeName: string;
  menuId: number;
  menuName: string;
  menuPrice: number;
}

const SupportHistory = () => {
  const [supportData, setSupportData] = useState<SupportData[]>([]);

  // useEffect(() => {
  //   const fetchSupportData = async () => {
  //     try {
  //       const response = await axios.get('/supports');
  //       setSupportData(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchSupportData();
  // }, []);
  useEffect(() => {
    API.get('supports')
      .then((response: any) => {
        console.log(response.data);
        setSupportData(response.data.reverse());
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  return (
    <Wrapper>
      {supportData.map((support) => (
        <PostIt key={support.supportId}>
          <SupportInfo>
            <IdDiv>
              <span>후원번호 </span>
              <SupportId># {support.supportId}</SupportId>
            </IdDiv>
          </SupportInfo>
          {/* <p>Support State: {support.supportState}</p> */}
          <StoreName>{support.storeName}</StoreName>
          <HrDiv></HrDiv>
          <p>후원 날짜: {support.supportCreationDate}</p>
          <MenuInfo>메뉴명: {support.menuName}</MenuInfo>
          <p>가격: {support.menuPrice}</p>
        </PostIt>
      ))}
    </Wrapper>
  );
};

export default SupportHistory;
