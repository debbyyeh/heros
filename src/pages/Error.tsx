import { Link } from "react-router-dom";
import styled from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
`

const ErrorTitle = styled.h2`
  

`

export default function Error(){
    return(
        <ErrorContainer>
          <ErrorTitle>這是一個不存在的頁面</ErrorTitle>
          <Link to="/heroes">Click To Go Home</Link>
      </ErrorContainer>
    )
}