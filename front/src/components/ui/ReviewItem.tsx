import styled from 'styled-components';
import defaultUserImage from '../../resources/images/profileDefault.png';

export type Review = {
  reviewId: number;
  reviewContent: string;
  reviewCreatedTime: string;
  keywords: {
    content: string;
    createdDateTime: string;
    lastModifiedDateTime: string;
    id: number;
  }[];
  childId: number;
  childName: string;
  childProfileUrl: string;
};

const ReviewItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 20px;
`;

const MessageButton = styled.button`
  border: none;
  border-radius: 15px;
  text-align: center;
  padding: 7px;
  background-color: #e7e6f2;
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

export type ReviewItemProps = {
  reviews: Review[];
};

function ReviewItemList({ reviews }: ReviewItemProps) {
  if (reviews.length === 0) {
    return <div>리뷰가 없습니다.</div>;
  } else {
    const reviewList = reviews.map((review) => (
      <ReviewItem key={review.reviewId}>
        <UserImage
          src={review.childProfileUrl || defaultUserImage}
          alt="User Image"
        />
        <div>
          <UserName>{review.childName}</UserName>
          <ReviewText>{review.reviewContent}</ReviewText>
          <p>{new Date(review.keywords[0].createdDateTime).toLocaleString(
              'ko-KR',
              {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                // second: 'numeric',
                hour12: false,
              }
            )}</p>
          {review.keywords && review.keywords.length > 0 && (
            <>
              <MessageButton>{review.keywords[0].content}</MessageButton>
            </>
          )}
        </div>
      </ReviewItem>
    ));
    return <>{reviewList}</>;
  }
}

export default ReviewItemList;
