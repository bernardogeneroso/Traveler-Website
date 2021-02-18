import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  background: #f5f8fa;
`;

export const ContainerContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`;

export const ContainerEvaluations = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ContentEvaluations = styled.div`
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
    background: linear-gradient(90deg, #fff8eb 0%, rgba(255, 255, 255, 0) 100%);
    border-radius: 16px;
    border: solid 0px transparent;
    background-clip: padding-box;
    position: relative;
    cursor: pointer;

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
      background: linear-gradient(90deg, #fedb95 0%, rgb(220, 226, 229) 100%);
    }

    div.user-info {
      display: flex;
      flex-direction: row;
      place-content: center;
      align-items: center;

      img {
        height: 56px;
        margin-right: 20px;
        border-radius: 50%;
      }

      h2 {
        font-weight: 700;
        font-size: 20px;
        color: #123952;
      }
    }

    div.evaluation-data {
      display: flex;
      flex-direction: row;
      place-content: center;
      align-items: center;

      div.status {
        height: 24px;
        width: 24px;
        background: #f3f3f3;
        border-radius: 50%;
        margin-right: 40px;
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
