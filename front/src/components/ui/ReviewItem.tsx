import styled from 'styled-components';

const Review = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  padding: 15px;
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

function ReviewItem() {
  return (
    <div>
      <Review>
        <UserImage
          src="https://img2.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/22/koreadognews/20210522152933617uzcd.png"
          alt="User Image"
        />
        <div>
          <UserName>익명의 너구리</UserName>
          <ReviewText>
            후원자님 덕분에 너무 맛있게 식사했습니다. 감사합니다!
          </ReviewText>
        </div>
      </Review>
      <Review>
        <UserImage
          src="https://img2.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/22/koreadognews/20210522152933617uzcd.png"
          alt="User Image"
        />
        <div>
          <UserName>익명의 다람쥐</UserName>
          <ReviewText>
            눈치보지 않고 따듯한 식사를 할 수 있어서 너무 좋았습니다.
          </ReviewText>
        </div>
      </Review>
      <Review>
        <UserImage
          src="https://img2.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/22/koreadognews/20210522152933617uzcd.png"
          alt="User Image"
        />
        <div>
          <UserName>익명의 다람쥐</UserName>
          <ReviewText>
            눈치보지 않고 따듯한 식사를 할 수 있어서 너무 좋았습니다.
          </ReviewText>
        </div>
      </Review>
    </div>
  );
}

export default ReviewItem;
