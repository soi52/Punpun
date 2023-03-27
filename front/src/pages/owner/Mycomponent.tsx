import React from 'react';
import styled from 'styled-components';
import useScrollFadeInPage from './useScrollFadeInPage';
import mainImage from '../../resources/images/alone_child.jpg';
import thumb from '../../resources/images/thumb.png';

const MainImage = styled.img`
  background: url(${mainImage}) no-repeat center;
  background-size: cover;
  width: 100%;
  height: 100%;
`;
const ThumbImage = styled.img`
  background: url(${thumb}) no-repeat center
  width: 50%;
  height: 50%;
`;

const ImageDiv = styled.div`
  width: '100vw';
  height: '100vh';
`;

const MyComponent: React.FC = () => {
  const { ref: ref1, style: style1 } = useScrollFadeInPage({
    direction: 'up',
    duration: 1,
    delay: 0,
  });

  const { ref: ref2, style: style2 } = useScrollFadeInPage({
    direction: 'up',
    duration: 1,
    delay: 5,
  });

  const { ref: ref3, style: style3 } = useScrollFadeInPage({
    direction: 'up',
    duration: 1,
    delay: 0,
  });

  const { ref: ref4, style: style4 } = useScrollFadeInPage({
    direction: 'up',
    duration: 1,
    delay: 0,
  });

  return (
    <>
      <div ref={ref1} style={style1}>
        <ThumbImage src={thumb} />
      </div>
      <div ref={ref2} style={style2}>
        <ThumbImage src={thumb} />
      </div>
      <div ref={ref3} style={style3}>
        <p>
          Nulla facilisi. Sed id ipsum vel risus congue laoreet. Sed feugiat
          dolor vitae odio feugiat, vitae pellentesque nulla auctor. Duis ut
          urna eu quam accumsan facilisis.
        </p>
        <p>
          Nulla facilisi. Sed id ipsum vel risus congue laoreet. Sed feugiat
          dolor vitae odio feugiat, vitae pellentesque nulla auctor. Duis ut
          urna eu quam accumsan facilisis.
        </p>
        <p>
          Nulla facilisi. Sed id ipsum vel risus congue laoreet. Sed feugiat
          dolor vitae odio feugiat, vitae pellentesque nulla auctor. Duis ut
          urna eu quam accumsan facilisis.
        </p>
        <p>
          Nulla facilisi. Sed id ipsum vel risus congue laoreet. Sed feugiat
          dolor vitae odio feugiat, vitae pellentesque nulla auctor. Duis ut
          urna eu quam accumsan facilisis.
        </p>
        <p>
          Nulla facilisi. Sed id ipsum vel risus congue laoreet. Sed feugiat
          dolor vitae odio feugiat, vitae pellentesque nulla auctor. Duis ut
          urna eu quam accumsan facilisis.
        </p>
      </div>
      <div ref={ref4} style={style4}>
        <p>
          Nulla facilisi. Sed id ipsum vel risus congue laoreet. Sed feugiat
          dolor vitae odio feugiat, vitae pellentesque nulla auctor. Duis ut
          urna eu quam accumsan facilisis.
        </p>
        <p>
          Nulla facilisi. Sed id ipsum vel risus congue laoreet. Sed feugiat
          dolor vitae odio feugiat, vitae pellentesque nulla auctor. Duis ut
          urna eu quam accumsan facilisis.
        </p>
        <p>
          Nulla facilisi. Sed id ipsum vel risus congue laoreet. Sed feugiat
          dolor vitae odio feugiat, vitae pellentesque nulla auctor. Duis ut
          urna eu quam accumsan facilisis.
        </p>
        <p>
          Nulla facilisi. Sed id ipsum vel risus congue laoreet. Sed feugiat
          dolor vitae odio feugiat, vitae pellentesque nulla auctor. Duis ut
          urna eu quam accumsan facilisis.
        </p>
        <p>
          Nulla facilisi. Sed id ipsum vel risus congue laoreet. Sed feugiat
          dolor vitae odio feugiat, vitae pellentesque nulla auctor. Duis ut
          urna eu quam accumsan facilisis.
        </p>
      </div>
    </>
  );
};

export default MyComponent;
