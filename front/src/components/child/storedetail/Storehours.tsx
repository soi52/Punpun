import styled from 'styled-components';

type StoreHourProps = {
  storeAddress: string | null;
  storeInfo: string | null;
  storeOpenTime: string | null;
  storePhoneNumber: string | null;
  storeAlwaysShare: Boolean;
};

const StoreInfo = styled.div`
  border-radius: 10px;
  padding: 0px 20px 0px 20px;
  margin: 0px 0px 0px 0px;
  width: 300px;
`;

const Label = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
`;

const Info = styled.span`
  font-size: 16px;
`;

const StoreHour = ({
  storeAddress,
  storeInfo,
  storeOpenTime,
  storePhoneNumber,
  storeAlwaysShare,
}: StoreHourProps) => {
  return (
    <StoreInfo>
      <Label>정보</Label>
      <Info>{storeInfo ? storeInfo : '준비 중 입니다.'}</Info>
      <Label>위치</Label>
      <Info>{storeAddress ? storeAddress : '준비 중 입니다.'}</Info>
      <Label>영업시간</Label>
      <Info>{storeOpenTime ? storeOpenTime : '준비 중 입니다.'}</Info>
      <Label>전화번호</Label>
      <Info>{storePhoneNumber ? storePhoneNumber : '준비 중 입니다'}</Info>
      <Label>{storeAlwaysShare ? '항상 후원하는 가게입니다.' : null}</Label>
    </StoreInfo>
  );
};

export default StoreHour;
