import { shade } from "polished";
import styled, { css } from "styled-components";

interface ContentProps {
  maxCharacther: boolean;
}

interface BackgroundImageCityProps {
  image: string;
  imageChange: boolean;
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
  max-width: 800px;
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
      padding: 55px 62px;

      border-top-right-radius: 16px;
      border-top-left-radius: 16px;

      background: linear-gradient(
        90deg,
        #fef7f5 0%,
        rgba(254, 247, 245, 0) 62.99%
      );

      span {
        font-size: 36px;
        font-weight: 600;
        color: #f25d27;
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
        background: #51b853;
        color: #fff;
        border-radius: 10px;

        transition: all ease 0.2s;

        &:hover {
          background: ${shade(0.1, "#51B853")};
        }
      }
    }
  }
`;

export const Content = styled.div<ContentProps>`
  padding: 62px;
  margin-bottom: 40px;

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
      font-size: 16px;
      font-weight: 400;
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

    .focus {
      position: absolute;
      color: #51b853;
    }

    label {
      color: #617480;
      font-weight: 400;
      font-size: 14px;
    }
  }
`;

export const BackgroundImageCity = styled.div<BackgroundImageCityProps>`
  margin-top: 8px;
  height: 160px;
  width: 100%;
  border-radius: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  ${(props) =>
    props.imageChange &&
    css`
      border: 1px solid #dce2e6;
      background: #f5f8fa;
    `};

  div:nth-child(1) {
    background: url(${(props) => props.image});
    background-size: cover;
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position-y: center;
    border-radius: 16px;
  }

  label {
    padding: 11px 13px;
    background: #fff;
    border-radius: 10px;
    position: absolute;
    top: 15px;
    right: 15px;
    display: flex;
    align-items: center;

    &:hover {
      cursor: pointer;
      background: ${shade(0.06, "#fff")};
    }
  }

  input[type="file"] {
    display: none;
  }
`;
