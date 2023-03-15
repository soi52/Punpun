import MainMessage from '../ui/MainMessage';
import MainTitle from '../ui/MainTitle';

function StoreInfo() {
  const storeInfo = {
    title: '따뜻한 사랑과 건강한 식사를 나눠주시는',
    ownerName: '김싸피 사장님',
    message: '어느새 10번의 식사 나눔을 하셨네요!',
    name: '싸피식당',
  };
  return (
    <>
      <h2>
        <MainTitle title={`${storeInfo.title} ${storeInfo.name}`} />
      </h2>
      <MainMessage message={`${storeInfo.ownerName}, ${storeInfo.message}`} />
    </>
  );
}

export default StoreInfo;
