import styled from "styled-components";

import MainTitle from "../ui/MainTitle";
import MainMessage from "../ui/MainMessage";

const ComponentStyle = styled.div`
  padding: 20px;
`;

function SuUserEdit() {
  const mainMessage = {
    title: '',
    ownerName: '박정은 후원자님',
    message: '어느새 후원한 금액이 10,000원 이네요!',
    name: '정은 후원자님',
  };


  return (
    <ComponentStyle>
      <h2>
        <MainTitle title={`${mainMessage.name} ${mainMessage.title}`} />
      </h2>
      <MainMessage message={`${mainMessage.ownerName}, ${mainMessage.message}`} />

    </ComponentStyle>
  );
}

export default SuUserEdit;
