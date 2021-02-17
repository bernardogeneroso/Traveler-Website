import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.div`
  background-color: #120e0e;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  z-index: 9999;
`;

export const Dialog = styled.div`
  height: 100%;
  margin: 0 auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    color: #fff;
    font-weight: 500;
    font-size: 54px;
    margin-top: -95px;
  }

  span {
    font-weight: 400;
    font-size: 24px;
    color: #a0acb3;
    text-align: center;
    margin-top: 25px;
  }

  div {
    margin-top: 40px;
    display: flex;
    flex-direction: row;

    font-size: 16px;
    font-weight: 500;

    button:nth-child(1) {
      padding: 12px 24px;
      color: #fff;
      background: #de3838;
      border: 0;
      border-radius: 10px;
      margin-right: 8px;

      &:hover {
        background: ${shade(0.2, "#de3838")};
      }
    }

    button:nth-child(2) {
      padding: 12px 24px;
      color: #fff;
      background: #51b853;
      border: 0;
      border-radius: 10px;

      &:hover {
        background: ${shade(0.2, "#51b853")};
      }
    }
  }
`;

export const ContainerShow = styled.div`
  position: relative;

  img:nth-child(2) {
    position: absolute;
    left: 50px;
    top: 50px;
  }

  img:nth-child(3) {
    position: absolute;
    left: 100px;
    top: 100px;
  }

  img:nth-child(4) {
    position: absolute;
    left: 120px;
    top: 120px;
  }
`;
