import styled, { css } from "styled-components";

import { shade } from "polished";

interface ContainerProps {
  middleContent: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 96px;
  padding: 22px;

  ${(props) =>
    props.middleContent
      ? css`
          background: #fff;
          border-bottom: 1px solid #dce2e6;
        `
      : css`
          background: transparent;
        `};
`;

export const ContainerStructure = styled.div`
  height: 100%;
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: transparent;
`;

export const ContainerLogo = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 26px;

    margin-right: 22px;
  }

  div {
    display: flex;
    align-items: center;

    padding: 12px;
    border-radius: 10px;
    border: 1px solid #dce2e5;

    transition: all ease 0.2s;
  }

  div:hover {
    cursor: pointer;
    transform: scale(0.9);
    background: ${shade(0.03, "#fff")};
  }
`;

export const ContainerMiddle = styled.div``;

export const ContentMiddleCity = styled.div`
  font-weight: 500;
  font-size: 20px;
  color: #a0acb2;
`;

export const ContentMiddleSearchCity = styled.div`
  height: 40px;
  width: 300px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-right: 10px;
  padding-left: 10px;

  background: #f5f8fa;
  border-radius: 10px;

  border: 1px solid ${shade(0.1, "#f5f8fa")};

  input {
    width: 100%;
    background: transparent;
    border: 0;

    color: #123952;

    margin-left: 12px;
    margin-right: 12px;
  }

  input::placeholder {
    color: #a0acb2;
    font-size: 16px;
    font-weight: 400px;

    padding-left: 4px;
  }
`;

export const ContainerRestrictAccess = styled.div`
  button {
    color: #115d8c;
    border: 0;
    padding: 11px 32px;
    background: #dde9f0;
    border-radius: 10px;

    transition: all ease 0.2s;
  }

  button:hover {
    background: ${shade(0.05, "#dde9f0")};
  }
`;
