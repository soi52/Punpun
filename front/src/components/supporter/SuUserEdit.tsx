import styled from "styled-components";

import SuMainMessage from "./SuMainMessage";

const ComponentStyle = styled.div`
  padding: 20px;
`;

function SuUserEdit() {

  return (
    <ComponentStyle>
      <SuMainMessage/>
    </ComponentStyle>
  );
}

export default SuUserEdit;
