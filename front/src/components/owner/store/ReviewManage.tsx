import styled from 'styled-components';
import MainMessage from '../../ui/MainMessage';
import MainTitle from '../../ui/MainTitle';
import ReviewItem from '../../ui/ReviewItem';

const Wrapper = styled.div`
  padding: 20px;
`;

function ReviewManage() {
  const storeInfo = {
    title: '따뜻한 사랑과 건강한 식사를 나눠주시는',
    ownerName: '김싸피 사장님',
    message: '어느새 10번의 식사 나눔을 하셨네요!',
    name: '싸피식당',
  };

  const reviews = [
    {
      id: 1,
      userImage:
        'https://img2.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/22/koreadognews/20210522152933617uzcd.png',
      userName: '익명의 너구리',
      reviewText: '후원자님 덕분에 너무 맛있게 식사했습니다. 감사합니다!',
    },
    {
      id: 2,
      userImage:
        'https://img2.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/22/koreadognews/20210522152933617uzcd.png',
      userName: '익명의 다람쥐',
      reviewText: '눈치보지 않고 따듯한 식사를 할 수 있어서 너무 좋았습니다.',
    },
    {
      id: 3,
      userImage:
        'https://img2.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/22/koreadognews/20210522152933617uzcd.png',
      userName: '익명의 다람쥐',
      reviewText: '눈치보지 않고 따듯한 식사를 할 수 있어서 너무 좋았습니다.',
    },
  ];

  return (
    <Wrapper>
      <h2>
        <MainTitle title={`${storeInfo.title} ${storeInfo.name}`} />
      </h2>
      <MainMessage message={`${storeInfo.ownerName}, ${storeInfo.message}`} />
      <h2>감사인사 목록</h2>
      <ReviewItem reviews={reviews} />
    </Wrapper>
  );
}

export default ReviewManage;
