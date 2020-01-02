import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

export default function Home() {
  return (
    <>
      <h1>Hola</h1>
      <Title>My page</Title>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </>
  );
}

const Title = styled.h1`
  font-size: 40px;
  color: ${({ theme }) => theme.colors.primary};
`;
