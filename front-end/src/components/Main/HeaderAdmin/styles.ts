import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.div`
  width: 100%;
  height: 96px;
  padding: 22px;

  background: #fff;
  border-bottom: 1px solid #dce2e6;
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

export const ContainerMiddle = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #a0acb2;
`;

export const ContainerLeft = styled.div`
  h1 {
    font-size: 36px;
    font-weight: 600;
    color: #123952;
  }

  div {
    display: flex;
    align-items: center;

    padding: 12px;
    border-radius: 10px;
    border: 1px solid #dce2e5;

    transition: all ease 0.2s;

    &:hover {
      cursor: pointer;
      transform: scale(0.9);
      background: ${shade(0.03, "#fff")};
    }
  }
`;

export const ContainerRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    cursor: pointer;
  }

  div:nth-child(1):hover,
  div:nth-child(2):hover {
    background: ${shade(0.06, "#fff")};
  }

  div:nth-child(1) {
    width: 40px;
    height: 40px;
    border: 1px solid #dce2e5;
    background: #fff;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;

    display: flex;
    place-content: center;
    align-items: center;
  }

  div:nth-child(2) {
    width: 40px;
    height: 40px;
    border: 1px solid #dce2e5;
    background: #fff;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    margin-left: 10px;
    margin-right: 20px;

    display: flex;
    place-content: center;
    align-items: center;
  }

  button {
    padding: 11px 32px 11px 32px;
    background: #51b853;
    color: #fff;
    border-radius: 10px;
    border: 0;

    transition: all ease 0.2s;

    &:hover {
      background: ${shade(0.06, "#51b853")};
    }
  }
`;
