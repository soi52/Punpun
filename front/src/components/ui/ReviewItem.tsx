import styled from 'styled-components';
import defaultUserImage from '../../resources/images/profileDefault.png';

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
    reviewId: number;
    reviewContent: string;
    keywords: { content: string }[]; // keywords 배열 요소 타입을 정의합니다.
    childId: number;
    childName: string;
    childProfileUrl: string;
  }[];
}

function ReviewItem({ reviews }: ReviewItemProps) {
  if (reviews.length === 0) {
    return <div>리뷰가 없습니다.</div>;
  } else {
    const reviewList = reviews.map((review) => (
      <Review key={review.reviewId}>
        <UserImage
          src={review.childProfileUrl || defaultUserImage}
          alt="User Image"
        />
        <div>
          <UserName>{review.childName}</UserName>
          <ReviewText>{review.reviewContent}</ReviewText>
          {review.keywords && review.keywords.length > 0 && (
            <ReviewText>{review.keywords[0].content}</ReviewText>
          )}
        </div>
      </Review>
    ));
    return <>{reviewList}</>;
  }
}

export default ReviewItem;
