import { shade } from "polished";
import styled from "styled-components";

interface ContentProps {
  maxCharacther: boolean;
}

export const Container = styled.div`
  background: #f5f8fa;

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
`;

export const ContainerStructure = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  margin-top: 30px;
`;

export const ContainerContent = styled.div`
  form {
    border-radius: 16px;
    background: #fff;

    header {
      height: 143px;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 62px;

      border-top-right-radius: 16px;
      border-top-left-radius: 16px;

      background: linear-gradient(
        90deg,
        #f5fff5 0%,
        rgba(220, 245, 221, 0) 62.99%
      );

      div {
        padding: 12px 17px;
        color: #fff;
        background: #51b853;
        border-radius: 10px;
        font-size: 24px;
        font-weight: 400;
      }

      span {
        font-size: 36px;
        font-weight: 600;
        color: #51b853;
        margin-left: 32px;
      }
    }

    footer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      margin-top: 30px;

      div {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;

        svg {
          margin-right: 12px;
        }

        span {
          color: #617480;
          font-weight: 400;
          font-size: 14px;
          width: 150px;
        }
      }

      button {
        padding: 11px 26px;
        border: 0;
        background: #115d8c;
        color: #fff;
        border-radius: 10px;

        transition: all ease 0.2s;

        &:hover {
          background: ${shade(0.1, "#115D8C")};
        }
      }
    }
  }
`;

export const Content = styled.div<ContentProps>`
  padding: 62px;

  h3 {
    color: #123952;
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 12px;
  }

  hr {
    border: 1px solid #dce2e6;
  }

  .form-input {
    margin-top: 18px;

    display: flex;
    flex-direction: column;

    label {
      color: #617480;
      font-weight: 400;
      font-size: 14px;
      margin-bottom: 8px;
    }

    input {
      background: #f5f8fa;
      border-radius: 10px;
      border: 1px solid #dce2e6;
      height: 56px;
      padding: 12px 16px;
      color: #123952;
    }
  }

  .form-textarea {
    margin-top: 18px;

    display: flex;
    flex-direction: column;

    position: relative;

    label {
      color: #617480;
      font-weight: 400;
      font-size: 14px;
      margin-bottom: 8px;
    }

    textarea {
      background: #f5f8fa;
      border-radius: 10px;
      border: 1px solid #dce2e6;
      padding: 12px 16px;
      resize: none;
      color: #123952;
    }

    span {
      position: absolute;
      bottom: 0;
      right: 0;
      margin-bottom: 12px;
      margin-right: 12px;

      color: ${(props) => (props.maxCharacther ? "#F25D27" : "#a0acb2")};
      font-weight: 400;
      font-size: 12px;
    }
  }

  .form-image-upload {
    margin-top: 18px;

    label {
      color: #617480;
      font-weight: 400;
      font-size: 14px;

      &.focus {
        color: #51b853;
      }
    }

    div {
      margin-top: 8px;
      height: 160px;
      width: 100%;
      border-radius: 16px;
      border: 2px dashed #dce2e6;
      background: #f5f8fa;

      display: flex;
      align-items: center;
      justify-content: center;

      label {
        color: #f25d27;
        margin-bottom: 0;
      }

      input[type="file"] {
        display: none;
      }
    }
  }
`;
