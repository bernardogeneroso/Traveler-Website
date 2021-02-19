import { shade } from "polished";
import styled, { css } from "styled-components";

interface ContainerProps {
  blurOption: boolean;
}

interface ContentEvaluationsProps {
  approved: number;
}

interface ContentModalApprovalsEvaluationsProps {
  approved: number | undefined;
}

interface ContentShowRatingProps {
  checked: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  background: #f5f8fa;

  ${(props) =>
    props.blurOption &&
    css`
      filter: blur(3px);
    `}
`;

export const ContainerContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`;

export const ContainerEvaluations = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ContentEvaluations = styled.div<ContentEvaluationsProps>`
  background: #fff;
  border-radius: 16px;
  margin-top: 16px;
  position: relative;

  div.format {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    place-content: center;
    justify-content: space-between;
    padding: 0 25px 0px 25px;
    height: 88px;
    border-radius: 16px;
    border: solid 0px transparent;
    background-clip: padding-box;
    position: relative;
    cursor: pointer;

    ${(props) =>
      props.approved === 0
        ? css`
            background: linear-gradient(
              90deg,
              #fff8eb 0%,
              rgba(255, 255, 255, 0) 100%
            );

            &:before {
              background: linear-gradient(
                90deg,
                #fedb95 0%,
                rgb(220, 226, 229) 100%
              );
            }
          `
        : css`
            background: #fff;

            &:before {
              background: #dce2e6;
            }
          `}

    &:before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      margin: -1px;
      border-radius: inherit;
    }

    div.user-info {
      display: flex;
      flex-direction: row;
      place-content: center;
      align-items: center;

      img {
        height: 56px;
        width: 56px;
        margin-right: 20px;
        border-radius: 50%;
      }

      h2 {
        font-size: 20px;
        ${(props) =>
          props.approved === 0
            ? css`
                font-weight: 700;
                color: #123952;
              `
            : css`
                font-weight: 500;
                color: #617480;
              `}
      }
    }

    div.evaluation-data {
      display: flex;
      flex-direction: row;
      place-content: center;
      align-items: center;

      div.status {
        height: 28px;
        width: 28px;
        background: #f3f3f3;
        border-radius: 50%;
        margin-right: 40px;
        display: flex;
        justify-content: center;
        align-items: center;

        background: ${(props) =>
          props.approved === 1 ? "#DCF5DD" : props.approved === 2 && "#FFE1E1"};
      }

      div.topic-info {
        margin-right: 30px;
        width: 150px;

        span {
          color: #a0acb3;
          font-weight: 500;
          font-size: 10px;
        }

        h3 {
          color: #617480;
          font-weight: 500;
          font-size: 16px;
        }
      }
    }

    .new-evaluation {
      position: absolute;
      top: 32px;
      left: -46px;
      background: #f5a300;
      border: 1px solid #efb866;
      width: 56px;
      height: 27px;
      border-radius: 8px;
      display: flex;
      place-content: center;
      align-items: center;

      span {
        color: #ffffff;
        font-weight: 700;
        font-size: 13px;
        text-transform: uppercase;
      }
    }
  }
`;

export const ContainerModalEvaluations = styled.div`
  background-color: rgb(18, 57, 82, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  z-index: 9999;
`;

export const DialogModalEvaluations = styled.div`
  height: 100%;
  margin: 0 auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ContentModalApprovalsEvaluations = styled.div`
  width: 100%;
  background: #f5f8fa;
  border-radius: 20px;

  header {
    padding: 26px 30px 20px 30px;
    background: #fff;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dce2e5;

    h2 {
      font-weight: 600;
      font-size: 24px;
      color: #f25d27;
    }

    div {
      padding: 8px;
      border: 1px solid #dce2e5;
      border-radius: 10px;
      display: flex;

      transition: all ease 0.2s;

      &:hover {
        cursor: pointer;
        background: ${shade(0.03, "#fff")};
      }
    }
  }

  .content {
    padding: 26px 30px 20px 30px;
    background: #f5f8fa;
    display: flex;
    flex-direction: row;

    div.left {
      img {
        height: 64px;
        width: 64px;
        border-radius: 50%;
      }
    }

    div.right {
      margin-left: 20px;
      width: 100%;

      h3 {
        color: #617480;
        font-weight: 600;
        font-size: 20px;
      }

      p {
        margin-top: 14px;
        color: #617480;
        font-weight: 400;
        font-size: 16px;
      }

      div.information {
        margin-top: 18px;
        display: flex;
        flex-direction: row;

        div.topic-info {
          flex-basis: 0;
          flex-grow: 1;

          span {
            font-weight: 500;
            font-size: 10px;
            color: #617480;
          }

          h3 {
            font-weight: 500;
            font-size: 16px;
            color: #617480;
          }
        }
      }

      div.rating-present {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
      }
    }
  }

  footer {
    padding: 26px 30px 20px 30px;
    background: #fff;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    border-top: 1px solid #dce2e5;

    button {
      padding: 11px 24px;
      border-radius: 10px;
      color: #fff;
      font-weight: 500;
      font-size: 16px;
      border: 0;

      transition: all ease 0.2s;
    }

    button.refuse {
      background: #de3838;
      margin-right: 10px;

      &:hover {
        background: ${shade(0.1, "#de3838")};
      }
    }

    button.accept {
      background: #51b853;

      &:hover {
        background: ${shade(0.1, "#51b853")};
      }
    }
  }
`;

export const ContentModalSeeEvaluations = styled.div<ContentModalApprovalsEvaluationsProps>`
  width: 100%;
  background: #f5f8fa;
  border-radius: 20px;

  header {
    padding: 26px 30px 20px 30px;
    background: #fff;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dce2e5;

    div.status-rating {
      display: flex;
      flex-direction: row;
      align-items: center;

      h2 {
        font-weight: 600;
        font-size: 24px;
        color: #f25d27;
      }

      div.status {
        height: 28px;
        width: 28px;
        background: #f3f3f3;
        border-radius: 50%;
        margin-left: 25px;
        display: flex;
        justify-content: center;
        align-items: center;

        background: ${(props) =>
          props.approved === 1 ? "#DCF5DD" : props.approved === 2 && "#FFE1E1"};
      }
    }

    div.modal-actions {
      display: flex;
      flex-direction: row;
      align-items: center;

      button {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px 24px;
        background: #ffe1e1;
        border-radius: 10px;
        border: 0;
        margin-right: 18px;
        color: #de3838;
        font-weight: 400;
        font-size: 16px;

        svg {
          margin-right: 6px;
        }

        transition: all ease 0.2s;

        &:hover {
          cursor: pointer;
          background: ${shade(0.03, "#ffe1e1")};
        }
      }

      div {
        padding: 8px;
        border: 1px solid #dce2e5;
        border-radius: 10px;
        display: flex;

        transition: all ease 0.2s;

        &:hover {
          cursor: pointer;
          background: ${shade(0.03, "#fff")};
        }
      }
    }
  }

  .content {
    padding: 30px;
    background: #f5f8fa;
    display: flex;
    flex-direction: row;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;

    div.left {
      img {
        height: 64px;
        width: 64px;
        border-radius: 50%;
      }
    }

    div.right {
      margin-left: 20px;
      width: 100%;

      h3 {
        color: #617480;
        font-weight: 600;
        font-size: 20px;
      }

      p {
        margin-top: 14px;
        color: #617480;
        font-weight: 400;
        font-size: 16px;
      }

      div.information {
        margin-top: 18px;
        display: flex;
        flex-direction: row;

        div.topic-info {
          flex-basis: 0;
          flex-grow: 1;

          span {
            font-weight: 500;
            font-size: 10px;
            color: #617480;
          }

          h3 {
            font-weight: 500;
            font-size: 16px;
            color: #617480;
          }
        }
      }

      div.rating-present {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
      }
    }
  }
`;

export const ContentShowRating = styled.div<ContentShowRatingProps>`
  display: flex;
  background: ${(props) => (props.checked ? "#FEF7F5" : "#fff")};
  margin-right: 4px;
`;
