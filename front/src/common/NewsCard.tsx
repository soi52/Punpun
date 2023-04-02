import React from 'react';
import styled from 'styled-components';
import he from 'he';

const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  overflow: hidden;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  margin: 10px;
  height: 300px;
`;

const CardBody = styled.div`
  padding: 20px;
`;

const CardTitle = styled.h5`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const CardText = styled.p`
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 0;
`;

const ReadMoreLink = styled.a`
  display: inline-block;
  margin-top: 10px;
`;

type NewsItem = {
    title: string;
    description: string;
    link: string;
}

interface NewsCardProps {
  newsItem: NewsItem;
}

const NewsCard = ({ newsItem }: NewsCardProps) => {
    const handleClick = () => {
        window.open(newsItem.link, '_blank');
    };

  return (
    <Card onClick={handleClick}>
      <CardBody>
        <CardTitle>{he.decode(newsItem.title)}</CardTitle>
        <CardText>{he.decode(newsItem.description)}</CardText>
      </CardBody>
    </Card>
  );
};

export default NewsCard;
