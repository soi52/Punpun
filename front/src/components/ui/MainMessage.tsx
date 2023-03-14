import styled from 'styled-components';

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 10px 10px 10px;
  border-color: transparent transparent #6fbced transparent;
  margin-left: 15px;
`;

const Message = styled.div`
  padding: 13px;
  color: #fff;
  line-height: 25px;
  width: 70%;
  display: inline-block;
  text-align: left;
  border-radius: 5px;
  background-color: #6fbced;
`;

function MainMessage(props: { message: string }) {
  return (
    <>
      <Triangle></Triangle>
      <Message>{props.message}</Message>
    </>
  );
}

export default MainMessage;
