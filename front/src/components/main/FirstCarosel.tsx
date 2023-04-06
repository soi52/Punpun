import FirstComponent from './FirstComponent';
import FirstComponent1 from './FirstComponent1';
import FirstComponent2 from './FirstComponent2';
import Slider, { Settings } from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';

import styled from 'styled-components';

const WrapComponent = styled.div`
  height: 100vh;
  width: 100vw;
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


function FirstCarosel() {
  const settings: Settings = {
    dots: true,
    infinite: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: false,
    speed: 1000,
    // cssEase: 'linear',
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
      <CustomSlider {...settings}>
        <WrapComponent>
          <FirstComponent />
        </WrapComponent>
        <WrapComponent>
          <FirstComponent1 />
        </WrapComponent>
        <WrapComponent>
          <FirstComponent2 />
        </WrapComponent>
      </CustomSlider>
    </>
  );
}

export default FirstCarosel;