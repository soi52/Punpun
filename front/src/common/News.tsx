import axios from 'axios';
import { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import styled from 'styled-components';
import Slider from 'react-slick';
import { Fade } from 'react-awesome-reveal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import 'slick-carousel/slick/slick.css?ver=1.0';
import 'slick-carousel/slick/slick-theme.css?ver=1.0';

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: '#C4C4C4',
        borderRadius: '50%',
        width: '35px',
        height: '35px',
        margin: 'auto',
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faChevronLeft} color="#c4c4c4" />
    </div>
  );
};

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: '#C4C4C4',
        borderRadius: '50%',
        width: '35px',
        height: '35px',
        margin: 'auto',
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faChevronRight} color="#c4c4c4" />
    </div>
  );
};

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  cssEase: 'linear',
  centerMode: false,
  variableWidth: false,
  initialSlide: 0,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Container = styled.div`
  margin: 50px;
`;

const Wrapper = styled.div`
  //   margin: 0 10px;
`;

type NewsItem = {
  title: string;
  description: string;
  link: string;
};

const News = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const query = '결식 아동 수';
      const clientId = process.env.REACT_APP_NAVER_CLIENT_ID;
      const clientSecret = process.env.REACT_APP_NAVER_CLIENT_KEY;
      // console.log(process.env.REACT_APP_NAVER_CLIENT_ID);
      // console.log(process.env.REACT_APP_KAKAO_MAP_KEY);
      // console.log(process.env.REACT_APP_KAKAO_REST_KEY);

      const url = `https://openapi.naver.com/v1/search/news.json?query=${query}&display=25`;

      try {
        const response = await axios.get(url, {
          headers: {
            'X-Naver-Client-Id': clientId,
            'X-Naver-Client-Secret': clientSecret,
          },
        });
        // console.log(response.data);

        const newsItems: NewsItem[] = response.data.items.map((item: any) => ({
          title: item.title.replace(/(<([^>]+)>)/gi, ''),
          description: item.description.replace(/(<([^>]+)>)/gi, ''),
          link: item.link,
        }));

        setNewsItems(newsItems);
      } catch (error) {
        // console.error(error);
      }
    };

    fetchNews();
  }, []);

  return (
    <Container>
      <Fade duration={2000} direction="up">
        <Slider {...sliderSettings}>
          {newsItems.map((item) => (
            <Wrapper key={item.link}>
              <NewsCard newsItem={item} />
            </Wrapper>
          ))}
        </Slider>
      </Fade>
    </Container>
  );
};

export default News;
