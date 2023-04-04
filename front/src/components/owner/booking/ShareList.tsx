import StoreInfo from '../StoreInfo';
import { useState, useEffect } from 'react';
import API from '../../../store/API';
import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';
import { selectedStoreState } from '../../../store/atoms';
import styled from 'styled-components';

interface MenuSupport {
  supportId: null | number;
  supportType: string;
  supportDate: string;
  menuId: number;
  menuName: string;
  totalCount: number;
  useCount: number;
}

const Wrapper = styled.div`
  padding: 20px;
`;

function ShareList() {
  const { storeId: myStoreId } = useParams();
  const [shareList, setShareList] = useState<MenuSupport[]>();
  const selectedStore = useRecoilValue(selectedStoreState);

  useEffect(() => {
    const config = {
      params: {
        page: 0,
        type: 'SHARE',
      },
    };
    API.get(`supports/${selectedStore?.storeId}`, config)
      .then((response) => {
        setShareList(response.data.content);
        console.log(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Wrapper>
      <StoreInfo />
      <h2>나눔 목록</h2>
      {shareList?.map((share, index) => (
        <>
          <p>{share.supportType}</p>
          <p>{share.menuName}</p>
          <p>
            남은 갯수: {share.useCount} / {share.totalCount}
          </p>
        </>
      ))}
    </Wrapper>
  );
}
export default ShareList;
