import styled, { css } from "styled-components";
import { shade } from "polished";

interface ContentCityProps {
  firstColumn: boolean;
  secondColumn: boolean;
}

export const Container = styled.div`
  height: 100vh;
  overflow: hidden;

  background: #f5f8fa;
`;

export const ContainerContent = styled.div`
  height: 100%;
  max-width: 1120px;
  margin: 0 auto;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  overflow: hidden;
`;

export const LeftPanel = styled.div`
  height: 500px;
  max-width: 310px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  h1 {
    font-weight: 600;
    font-size: 70px;
    color: #123952;
  }

  p {
    font-weight: 400;
    font-size: 18px;
    color: #617480;
  }

  button {
    color: #fff;
    font-weight: 500;
    font-size: 18px;
    padding: 18px 47px;
    border: 0;
    border-radius: 10px;
    background: #f25d27;

    transition: all ease 0.2s;
  }

  button:hover {
    background: ${shade(0.08, "#f25d27")};
  }
`;

export const RightPanel = styled.div`
  max-width: 580px;
`;

export const ContainerCities = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const ContentCity = styled.div<ContentCityProps>`
  width: auto;

  background: #fff;
  border-radius: 20px;

  margin-bottom: 25px;

  img {
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    height: 180px;
    width: 260px;
    object-fit: cover;
  }

  &:nth-child(1) {
    height: 267px;
  }

  ${(props) =>
    props.firstColumn &&
    css`
      height: 267px;
      margin-top: -60px;
    `}

  ${(props) =>
    props.secondColumn &&
    css`
      margin-top: 60px;
    `}

  div {
    border-bottom: 1px solid #dce2e5;
    border-left: 1px solid #dce2e5;
    border-right: 1px solid #dce2e5;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 16px;

    h3 {
      font-weight: 600;
      font-size: 16px;
      color: #123952;
    }

    span {
      font-weight: 400;
      font-size: 12px;
      color: #617480;
    }
  }
`;
