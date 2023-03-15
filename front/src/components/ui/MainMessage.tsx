import styled from 'styled-components';

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 10px 10px 10px;
  border-color: transparent transparent #ffffff transparent;
  margin-left: 30px;
`;

const Message = styled.div`
  padding: 10px;
  color: black;
  line-height: 25px;
  width: 70%;
  display: inline-block;
  text-align: left;
  border-radius: 10px;
  background-color: #ffffff;
`;

function MainMessage(props: { message: string }) {
  return (
    <>
      <Triangle></Triangle>
      <Message>　{props.message}</Message>
    </>
  );
}

export default MainMessage;
