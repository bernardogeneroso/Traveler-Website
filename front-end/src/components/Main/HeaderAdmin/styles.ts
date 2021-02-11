import styled, { css } from "styled-components";
import { shade } from "polished";

interface ContainerLeftProps {
  placeActive: boolean;
}

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
  font-weight: 400;
  color: #a0acb2;
`;

export const ContainerLeft = styled.div<ContainerLeftProps>`
  ${(props) =>
    props.placeActive &&
    css`
      max-width: 499px;
      width: 100%;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
    `}

  h1 {
    font-size: 36px;
    font-weight: 600;
    color: #123952;
  }

  .lastPage {
    display: flex;
    align-items: center;

    padding: 12px;
    border-radius: 10px;
    border: 1px solid #dce2e5;
    width: 48px;

    transition: all ease 0.2s;

    &:hover {
      cursor: pointer;
      transform: scale(0.9);
      background: ${shade(0.03, "#fff")};
    }
  }
`;

export const ContainerOptions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .edit,
  .trash {
    cursor: pointer;
  }

  .edit:hover,
  .trash:hover {
    background: ${shade(0.06, "#fff")};
  }

  .edit {
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

  .trash {
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

export const ContainerStages = styled.div`
  color: #a0acb3;
  font-weight: 700;
  font-size: 12px;

  .focus {
    color: #617480;
  }

  span:nth-child(1) {
    margin-right: 6px;
  }

  span:nth-child(2) {
    margin-left: 6px;
  }
`;

export const ContainercityEditName = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #a0acb2;
`;
