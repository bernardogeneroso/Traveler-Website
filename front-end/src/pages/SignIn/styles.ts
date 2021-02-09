import styled from "styled-components";
import { shade } from "polished";

interface BackgroundProps {
  image: string;
}

export const Container = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

export const Background = styled.div<BackgroundProps>`
  flex: 1;
  background-image: url(${(props) => props.image});
  background-size: cover;
`;

export const PanelRight = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
  justify-content: space-evenly;
  background: #f5f8fa;

  width: 100%;
  max-width: 736px;
`;

export const HeaderGoBack = styled.div`
  width: 380px;
`;

export const ContentPanelRight = styled.div`
  margin: 80px 0;
  width: 380px;

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    h2 {
      font-size: 36px;
      font-weight: 600;
      color: #123952;
      margin-bottom: 40px;
    }

    button {
      padding: 0 16px;
      height: 68px;
      background: #f25d27;
      color: #fff;
      border: 0;
      border-radius: 10px;
      margin-top: 20px;
      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.05, "#f25d27")};
      }
    }
  }
`;

export const ContainerOptions = styled.div`
  margin-top: 20px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  div {
    display: block;
    margin-bottom: 15px;

    input {
      padding: 0;
      height: initial;
      width: initial;
      margin-bottom: 0;
      display: none;
      cursor: pointer;
    }

    label {
      position: relative;
      cursor: pointer;
      color: #a0acb2;
      font-size: 16px;
      font-weight: 400;
    }

    label:before {
      content: "";
      -webkit-appearance: none;
      background-color: #fff;
      border: 2px solid #dce2e5;
      border-radius: 8px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
        inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
      padding: 10px;
      display: inline-block;
      position: relative;
      vertical-align: middle;
      cursor: pointer;
      margin-right: 14px;
    }

    input[type="checkbox"]:checked + label::before {
      content: "";
      background-color: #51b853;
      border: 2px solid #51b853;
    }

    input:checked + label:after {
      content: "";
      display: block;
      position: absolute;
      top: 4px;
      left: 8px;
      width: 6px;
      height: 11px;
      border-radius: 2px;
      border: solid #fff;
      border-width: 0 3px 3px 0;
      transform: rotate(45deg);
    }
  }

  a {
    color: #a0acb2;
    font-size: 16px;
    font-weight: 400;
    transition: all ease 0.2s;

    &:hover {
      color: ${shade(0.1, "#a0acb2")};
    }
  }
`;

export const Footer = styled.div`
  width: 380px;

  display: flex;
  flex-direction: row;
  align-items: center;

  p {
    margin-left: 18px;
    width: 140px;
    color: #617480;
    font-size: 14px;
    font-weight: 400;
  }
`;
