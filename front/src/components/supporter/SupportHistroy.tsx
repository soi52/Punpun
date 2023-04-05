import { useEffect, useState } from 'react';
import API from '../../store/API';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

const Wrapper = styled.div`
  margin: 30px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0px 3px 3px #ccc;
  margin-top: 30px;
`;

const TableHeader = styled.thead`
  background-color: #fcfcff;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #eee;

  &:hover {
    background-color: #f6f6f6;
  }
`;

const TableHeaderCell = styled.th`
  text-align: left;
  font-weight: bold;
  padding: 10px;
`;

const TableCell = styled.td`
  padding: 15px 10px;
`;

const StoreName = styled.td`
  padding: 15px 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    transform: scale(1.01);
  }
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
  const Navigate = useNavigate();

  const toStore = (storeId: number) => {
    Navigate(`/store/${storeId}`);
  };

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

  const filteredData = supportData.filter((support) => support.supportState === "SUPPORT");

  return (
    <Wrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>후원번호</TableHeaderCell>
            <TableHeaderCell>가게 이름</TableHeaderCell>
            <TableHeaderCell>메뉴명</TableHeaderCell>
            <TableHeaderCell>가격</TableHeaderCell>
            <TableHeaderCell>후원 날짜</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {filteredData.map((support) => (
            <TableRow key={support.supportId}>
              <TableCell>{`# ${support.supportId}`}</TableCell>
              <StoreName onClick={() => toStore(support.storeId)}>{support.storeName}</StoreName>
              <TableCell>{support.menuName}</TableCell>
              <TableCell>{support.menuPrice.toLocaleString()}원</TableCell>
              <TableCell>{support.supportCreationDate}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default SupportHistory;
