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
    <Wrapper>
      <Header />
      <MainImg>
        <img src={alone_child} alt="child" />
      </MainImg>
      <div>
        <div>우리나라에 결식 아동이 아직 있나요?</div>
        <div>
          현재, 전국 결식 우려 아동은
          <br />
          <b>무려 33만명입니다.</b>
        </div>
        <div>
          더 이상 아이들이 먹는 것에 눈치보지 않도록 많은 후원 부탁드립니다.
        </div>
        <button>후원하기</button>
      </div>
    </Wrapper>
  );
}

export default MainPage;
