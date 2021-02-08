import styled, { css } from "styled-components";

import Tooltip from "./../Tooltip";

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  position?: "top" | "bottom";
  icon: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  padding: 24px;
  width: 100%;

  ${(props) =>
    props.position === "top"
      ? css`
          border: 1px solid #dce2e5;
          border-top-right-radius: 10px;
          border-top-left-radius: 10px;
        `
      : css`
          border-bottom: 1px solid #dce2e5;
          border-right: 1px solid #dce2e5;
          border-left: 1px solid #dce2e5;
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
        `}

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}

    
  .treatmentInput {
    display: flex;
    flex-direction: column;
    width: 100%;

    ${(props) =>
      props.icon &&
      css`
        margin-right: 14px;
      `}

    label {
      font-size: 12px;
      color: #a0acb2;
      font-weight: 400;
    }

    input {
      flex: 1;
      background: transparent;
      border: 0;
      color: #617480;

      &::placeholder {
        color: #a0acb2;
      }
    }
  }

  svg {
    color: #a0acb2;
    flex-shrink: 0;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
