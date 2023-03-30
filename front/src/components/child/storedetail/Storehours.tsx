type StoreHourProps = {
  storeAddress: string | null;
  storeInfo: string | null;
  storeOpenTime: string | null;
  storePhoneNumber: string | null;
};

const StoreHour = ({   storeAddress
  , storeInfo, storeOpenTime, storePhoneNumber }: StoreHourProps) => {

  return (
    <div>
      { (storeInfo === null) ? 
      <p>정보: 준비 중 입니다 :)</p> :
      <p>정보: {storeInfo}</p>
       }
       { (storeOpenTime === null) ? 
      <p>영업시간: 준비 중 입니다 :)</p> :
      <p>영업시간: {storeOpenTime}</p>
       }
       { (storePhoneNumber === null) ? 
      <p>전화번호: 준비 중 입니다 :)</p> :
      <p>전화번호: {storePhoneNumber}</p>
       }
    </div>
  );
};

export default StoreHour;
