import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css?ver=1.0';
import 'slick-carousel/slick/slick-theme.css?ver=1.0';

export const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
  };

  return (
    <div className="carousel">
      <Slider {...settings}>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Slider>
    </div>
  );
};
