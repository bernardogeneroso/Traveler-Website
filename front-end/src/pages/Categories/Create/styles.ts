import { shade } from "polished";
import styled from "styled-components";

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
      padding: 62px;

      border-top-right-radius: 16px;
      border-top-left-radius: 16px;

      background: linear-gradient(
        90deg,
        #f5fff5 0%,
        rgba(220, 245, 221, 0) 62.99%
      );

      span {
        font-size: 36px;
        font-weight: 600;
        color: #51b853;
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

export const Content = styled.div`
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

  .form-row {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    label {
      color: #617480;
      font-weight: 400;
      font-size: 14px;
      margin-bottom: 8px;
    }

    .form-icon {
      display: flex;
      flex-direction: column;
      margin-right: 40px;
      position: relative;

      label {
        text-align: center;

        &.error {
          color: #c53030;
        }
      }

      .icon {
        width: 116px;
        height: 116px;
        max-width: 100%;
        padding: 24px;
        border-radius: 16px;
        background: #f5f8fa;
        border: 2px dashed #dce2e6;
        display: flex;
        place-content: center;
        align-items: center;

        div svg:hover,
        svg:hover {
          cursor: pointer;

          color: ${shade(0.2, "#F25D27")};
        }
      }

      .menu-icons {
        position: absolute;
        width: 116px;
        top: 29px;
        height: 123px;
        border-radius: 16px;
        background: #fff;
        border: 2px dashed #dce2e6;
        display: flex;
        flex-direction: column;
        place-content: center;
        align-items: center;

        transition: all ease 0.2s;

        div {
          svg {
            color: #f25d27;

            &:hover {
              cursor: pointer;

              color: ${shade(0.2, "#F25D27")};
            }
          }
        }
      }
    }

    .form-input {
      margin-top: 18px;

      display: flex;
      flex-direction: column;
      flex-basis: 0;
      flex-grow: 1;
      max-width: 100%;
      place-content: center;

      color: #617480;
      font-size: 16px;
      font-weight: 400;

      input {
        background: #f5f8fa;
        border-radius: 10px;
        border: 1px solid #dce2e6;
        height: 56px;
        padding: 12px 16px;
        color: #123952;
      }
    }
  }
`;
