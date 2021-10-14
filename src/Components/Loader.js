import React from "react";
import styled from "styled-components";

const Container = styled.div`
    height:100wh;
    width:100vw;
    display:flex;
    font-size:28px;
    justify-content: center;
    margin-top:10px;
`;

export default () => <Container>
    <span role="img" aria-label="Loading">
        ◈
    </span>
</Container>