import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { useRouter } from "next/router";
import fetch from "isomorphic-unfetch";

export default function Site({ kind, files }) {
  const { query } = useRouter();

  return (
    <>
      <Title>My site</Title>
      <p>The site id a: {kind}</p>
      <ul>
        {files.map(file => (
          <li key={file.id}>{file.name}</li>
        ))}
      </ul>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </>
  );
}

Site.getInitialProps = async ctx => {
  const { site } = ctx.query;
  const res = await fetch(`http://localhost:8080/folders/${site}`);
  const json = await res.json();
  return json;
};

const Title = styled.h1`
  font-size: 40px;
  color: ${({ theme }) => theme.colors.primary};
`;
