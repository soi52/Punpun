import styled from 'styled-components';
import ReviewItem from '../../ui/ReviewItem';
import StoreInfo from '../StoreInfo';

const Wrapper = styled.div`
  padding: 20px;
`;

function ReviewList() {
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
      <StoreInfo />
      <h2>감사인사 목록</h2>
      <ReviewItem reviews={reviews} />
    </Wrapper>
  );
}

export default ReviewList;
