import StoreInfo from '../StoreInfo';
import { useState, useEffect } from 'react';
import API from '../../../store/API';
import { useParams } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedStoreState, ShareListState } from '../../../store/atoms';
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

const StoreName = styled.td`
  padding: 15px 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    transform: scale(1.01);
  }
`;

function ShareList() {
  const { storeId: myStoreId } = useParams();
  const shareList = useRecoilValue(ShareListState);
  const selectedStore = useRecoilValue(selectedStoreState);

  // useEffect(() => {
  //   const config = {
  //     params: {
  //       page: 0,
  //       type: 'SHARE',
  //     },
  //   };
  //   API.get(`supports/${selectedStore?.storeId}`, config)
  //     .then((response) => {
  //       setShareList(response.data.content);
  //       console.log(response.data.content);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  return (
    <Wrapper>
      <StoreInfo />
      <h2>나눔 목록</h2>
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
      </Table>
    </Wrapper>
  );
}
export default ShareList;
