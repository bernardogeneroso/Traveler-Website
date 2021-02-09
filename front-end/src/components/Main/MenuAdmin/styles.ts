import styled from "styled-components";
import { shade } from "polished";

interface ContentModalLeaveProps {
  buttonAnimation: number;
}

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 96px;
  height: 100vh;
  background: #f25d27;
  z-index: 9;
`;

export const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 32px 0 32px 0;

  .power {
    cursor: pointer;

    &:hover {
      color: ${shade(0.1, "#fff")};
    }
  }
`;

export const ContainerOptions = styled.div`
  display: flex;
  flex-direction: column;

  a {
    margin-bottom: 22px;
  }
`;

export const ContainerModalLeave = styled.div`
  background-color: rgba(20, 8, 4, 0.95);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  z-index: 9999;
`;

export const DialogModalLeave = styled.div`
  height: 100%;
  margin: 0 auto;
  max-width: 650px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ContentModalLeave = styled.div<ContentModalLeaveProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  width: 100%;

  span {
    font-size: 36px;
    font-weight: 500;
    color: #fff;
  }

  div {
    display: flex;
    flex-direction: row;

    button:nth-child(1) {
      padding: 11px 24px;
      border-radius: 10px;
      color: #fff;
      font-size: 16px;
      font-weight: 500;
      background: ${(props) =>
        props.buttonAnimation === 1 ? "#f25d27" : "transparent"};
      border: 2px solid #f25d27;
      margin-right: 8px;
    }

    button:nth-child(2) {
      padding: 11px 24px;
      border-radius: 10px;
      color: #fff;
      font-size: 16px;
      font-weight: 500;
      background: ${(props) =>
        props.buttonAnimation === 1 ? "transparent" : "#f25d27"};
      border: 2px solid #f25d27;
    }
  }
`;
