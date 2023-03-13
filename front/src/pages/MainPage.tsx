import styled from 'styled-components';
import { useEffect, useState } from 'react';

const Base = styled.div`
  width: 100%;
  height: 100vh;
`;

const SliderObject = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const TomatoBox = styled(SliderObject)`
  background-color: lightcoral;
`;

const BlueBox = styled(SliderObject)`
  background-color: skyblue;
`;

const GreenBox = styled(SliderObject)`
  background-color: lightgreen;
`;

const GreyBox = styled(SliderObject)`
  background-color: grey;
`;

const OrangeBox = styled(SliderObject)`
  background-color: orange;
`;

interface IFullPage {
  windowHeight: number;
  currentPage: number;
}

function MainPage() {
  const [pageState, setPageState] = useState<IFullPage>({
    currentPage: 1,
    windowHeight: window.innerHeight,
  });

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight } = document.documentElement;
      const currentPage = Math.ceil(scrollTop / clientHeight);
      const windowHeight = window.innerHeight;
      setPageState({ currentPage, windowHeight });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Base className="slider">
      <SliderObject>
        <TomatoBox></TomatoBox>
      </SliderObject>
      <SliderObject>
        <BlueBox></BlueBox>
      </SliderObject>
      <SliderObject>
        <GreenBox></GreenBox>
      </SliderObject>
      <SliderObject>
        <GreyBox></GreyBox>
      </SliderObject>
      <SliderObject>
        <OrangeBox></OrangeBox>
      </SliderObject>
    </Base>
  );
}

export default MainPage;
