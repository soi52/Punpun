import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css?ver=1.0';
import 'slick-carousel/slick/slick-theme.css?ver=1.0';

import process1 from '../../resources/images/main/process1.png';
import process2 from '../../resources/images/main/process2.png';
import process3 from '../../resources/images/main/process3.png';
import process4 from '../../resources/images/main/process4.png';
import process5 from '../../resources/images/main/process5.png';

import styled from 'styled-components';

import { GrFormPrevious, GrFormNext } from 'react-icons/gr';

const ProcessDiv = styled.div`
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const Label = styled.span`
  display: flex;
  justify-content: center; /* 텍스트를 수평 중앙 정렬 */
  margin-top: 16px; /* 이미지와 라벨 사이의 간격 추가 */
  font-weight: bold;
  font-size: 20px;
  font-family: GmarketSansMedium, sans-serif, Arial;
`;

const Image = styled.img`
  display: flex;
  justify-content: center; /* 이미지를 수평 중앙 정렬 */
  max-width: 100% !important;
  margin-bottom: 8px; /* 이미지와 라벨 사이의 간격 추가 */
`;

const Div = styled.div`
  position: absolute;
  right: 4.2rem;
  z-index: 99;
  text-align: right;
  line-height: 30px;
`;
const DivPre = styled.div`
  position: absolute;
  left: 1.2rem;
  z-index: 99;
  text-align: left;
  line-height: 30px;
`;

const CustomSlider = styled(Slider)`
  position: relative;
  /* margin-right: 30px; */
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .slick-slide div {
    //슬라이더  컨텐츠
    cursor: pointer;
  }
`;


const Carousel = () => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    cssEase: 'linear',
    centerMode: true,
    centerpadding: '70px',
    dotsClass : "slick-dots",
    variableWidth: false,
    initialSlide: 0,
    nextArrow: (
      <Div>
        <GrFormNext size={72} />
      </Div>
    ),
    prevArrow: (
      <DivPre>
        <GrFormPrevious size={72} />
      </DivPre>
    ),
  };
  return (
    <>
      <CustomSlider {...sliderSettings}>
        <ProcessDiv id="processdiv" style={{ display: 'flex' }}>
          <Image src={process1} style={{ width: '60%' }} />
          <Label>예약 신청</Label>
        </ProcessDiv>
        <ProcessDiv id="processdiv" style={{ display: 'flex' }}>
          <Image src={process2} style={{ width: '60%' }} />
          <Label>예약 알림</Label>
        </ProcessDiv>
        <ProcessDiv id="processdiv" style={{ display: 'flex' }}>
          <Image src={process3} style={{ width: '60%' }} />
          <Label>예약 확정</Label>
        </ProcessDiv>
        <ProcessDiv id="processdiv" style={{ display: 'flex' }}>
          <Image src={process4} style={{ width: '60%' }} />
          <Label>식사</Label>
        </ProcessDiv>
        <ProcessDiv id="processdiv" style={{ display: 'flex' }}>
          <Image src={process5} style={{ width: '50%' }} />
          <Label>감사 메세지</Label>
        </ProcessDiv>
      </CustomSlider>
    </>
  );
};

export default Carousel;
