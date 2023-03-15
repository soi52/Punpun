import styled from 'styled-components';

const Review = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 20px;
`;

const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 20px;
`;

const UserName = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const ReviewText = styled.p`
  font-size: 16px;
`;

interface ReviewItemProps {
  reviews: {
    id: number;
    userImage: string;
    userName: string;
    reviewText: string;
  }[];
}

function ReviewItem({ reviews }: ReviewItemProps) {
  const reviewList = reviews.map((review) => (
    <Review key={review.id}>
      <UserImage src={review.userImage} alt="User Image" />
      <div>
        <UserName>{review.userName}</UserName>
        <ReviewText>{review.reviewText}</ReviewText>
      </div>
    </Review>
  ));

  return <>{reviewList}</>;
}

export default ReviewItem;
