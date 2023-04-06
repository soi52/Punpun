import StoreInfo from '../StoreInfo';
import { useRecoilValue } from 'recoil';
import { ShareListState } from '../../../store/atoms';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  // box-shadow: 0px 3px 3px #ccc;
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
  border: none;
`;

const TableCell = styled.td`
  padding: 15px 10px;
  border: none;
`;

const NoContent = styled.td`
  display: flex;
  justify-content: center;
  padding: auto;
  margin : 30px;
`;

function ShareList() {
  const shareList = useRecoilValue(ShareListState);

  return (
    <Wrapper>
      <StoreInfo />
      <h2>나눔 목록</h2>
      {shareList.length > 0 ? (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>나눔번호</TableHeaderCell>
            <TableHeaderCell>메뉴명</TableHeaderCell>
            <TableHeaderCell>남는 수량</TableHeaderCell>
            <TableHeaderCell>날짜</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <tbody>
          
          {shareList?.map((share, index) => (
            <TableRow key={share.supportId}>
              <TableCell># {index+1}</TableCell>
              <TableCell>{share.menuName}</TableCell>
              <TableCell>
                {share.useCount} / {share.totalCount}
              </TableCell>
              <TableCell>{share.supportDate}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>)
      : (
        <>
          <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>나눔번호</TableHeaderCell>
              <TableHeaderCell>메뉴명</TableHeaderCell>
              <TableHeaderCell>남는 수량</TableHeaderCell>
              <TableHeaderCell>날짜</TableHeaderCell>
            </TableRow>
          </TableHeader>
          </Table>
          <NoContent>아직 나눔 내역이 없어요 :(</NoContent>
        </>
      )}
    </Wrapper>
  );
}
export default ShareList;
