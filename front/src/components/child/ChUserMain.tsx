import styled from "styled-components";

import Message from "./Message";

const ComponentStyle = styled.div`
  padding: 0px 30px 0px 30px;
`;

const ChUserMain = () => {
    return (
        <ComponentStyle>
            <h2>오늘의 예약</h2>

            <h2>감사메세지 작성</h2>
            <Message/>
        </ComponentStyle>
    )
}

export default ChUserMain;