import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css?ver=1.0';
import 'slick-carousel/slick/slick-theme.css?ver=1.0';

import process1 from '../../resources/images/main/process1.png';
import process2 from '../../resources/images/main/process2.png';
import process3 from '../../resources/images/main/process3.png';
import process4 from '../../resources/images/main/process4.png';
import process5 from '../../resources/images/main/process5.png';

import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const ProcessDiv = styled.div`
  display: flex;
  flex-direction: column; /* 컨텐츠를 수직 정렬하기 위해 추가 */
  justify-content: center; /* 컨텐츠를 수직 중앙 정렬 */
  align-items: center; /* 컨텐츠를 수평 중앙 정렬 */
  margin: auto;
`;

const Label = styled.span`
  display: flex;
  justify-content: center; /* 텍스트를 수평 중앙 정렬 */
  margin-top: 16px; /* 이미지와 라벨 사이의 간격 추가 */
`;

const Image = styled.img`
  display: flex;
  justify-content: center; /* 이미지를 수평 중앙 정렬 */
  max-width: 100%; /* 이미지 크기 제한 */
  margin-bottom: 8px; /* 이미지와 라벨 사이의 간격 추가 */
`;

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      // style={{
      //   ...style,
      //   display: 'block',
      //   background: '#C4C4C4',
      //   borderRadius: '50%',
      //   width: '35px',
      //   height: '35px',
      //   margin: 'auto',
      // }}
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
      // style={{
      //   ...style,
      //   display: 'block',
      //   background: '#C4C4C4',
      //   borderRadius: '50%',
      //   width: '35px',
      //   height: '35px',
      //   margin: 'auto',
      // }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faChevronRight} color="#c4c4c4" />
    </div>
  );
};

const Carousel = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: 'linear',
    centerMode: true,
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
      //   {
      //     breakpoint: 480,
      //     settings: {
      //       slidesToShow: 1,
      //       slidesToScroll: 3,
      //     },
      //   },
    ],
  };
  return (
    <>
      <Slider {...sliderSettings}>
        <ProcessDiv id="processdiv">
          <Image src={process1} style={{ width: '60%' }} />
          <Label>예약 신청</Label>
        </ProcessDiv>
        <ProcessDiv id="processdiv">
          <Image src={process2} style={{ width: '60%' }} />
          <Label>예약 알림</Label>
        </ProcessDiv>
        <ProcessDiv id="processdiv">
          <Image src={process3} style={{ width: '60%' }} />
          <Label>예약 확정</Label>
        </ProcessDiv>
        <ProcessDiv id="processdiv">
          <Image src={process4} style={{ width: '60%' }} />
          <Label>식사</Label>
        </ProcessDiv>
        <ProcessDiv id="processdiv">
          <Image src={process5} style={{ width: '50%' }} />
          <Label>감사 메세지</Label>
        </ProcessDiv>
      </Slider>
    </>
  );
};

export default Carousel;
