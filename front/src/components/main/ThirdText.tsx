import styled from 'styled-components';

const Container = styled.div`
  background: #8dace5;
  font-family: 'Roboto', sans-serif;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 20%;
  transform: translate(-50%, -50%);
`;

const Text3d = styled.h1`
  font-size: 64px;
  font-family: GmarketSansMedium, sans-serif, Arial;
  color: #ffffff;
  text-shadow: -2px -1px 0 #f8f8f8, -2px -2px 0 #ff0000, -3px -3px 0 #e8e8e8, -4px -4px 0 #ff0000, -5px -5px 0 #d8d8d8, -6px -6px 0 #ff0000, -7px -7px 0 #c8c8c8;
  transform-origin: bottom right;
  -moz-transform-origin: bottom left;
  -webkit-transform-origin: bottom left;
  -ms-transform-origin: bottom left;
  transform-origin: bottom left;
  -moz-transform: skewY(-15deg);
  -webkit-transform: skewY(-15deg);
  -ms-transform: skewY(-15deg);
  -o-transform: skewY(-15deg);
  transform: skewY(-15deg);
  }

  ::before{
  content: attr(title);
  color: transparent;
  position: absolute;
  left: 0;
  bottom: 0;
  text-shadow: 0 0 5px rgba(0,0,0,.25);
  -moz-transform-origin: bottom left;
  -webkit-transform-origin: bottom left;
  -ms-transform-origin: bottom left;
  transform-origin: bottom left;
  -moz-transform: skewX(60deg);
  -webkit-transform: skewX(60deg);
  -ms-transform: skewX(60deg);
  -o-transform: skewX(60deg);
  transform: skewX(40deg);
  z-index: -1;
  };
`;


const ThirdText = () => {

    return(
        <Container>
            <Wrapper>
                <Text3d title="PUNPUN'S">PUNPUN'S</Text3d>
                <Text3d title="3 POINTS!">3 POINTS!</Text3d>
            </Wrapper>
        </Container>
    );
};

export default ThirdText;