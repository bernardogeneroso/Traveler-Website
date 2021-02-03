import styled from "styled-components";
import { shade } from "polished";

interface PlaceBackgroundProps {
  image: string;
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

export const ContainerPlaceInformation = styled.div`
  display: flex;
  justify-content: row;
  flex-wrap: wrap;
`;

export const StructurePlaceInformation = styled.div`
  width: 100%;
`;

export const PlaceBackground = styled.div<PlaceBackgroundProps>`
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  max-width: 650px;
  height: 850px;
  border-bottom-left-radius: 20px;
`;

export const ContainerStructurePlaceInformation = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const ContentPlaceInformation = styled.div`
  max-width: 499px;

  h1 {
    margin-top: 60px;
    font-weight: 600;
    font-size: 54px;
    color: #123952;
  }

  p {
    margin-top: 30px;
    font-size: 20px;
    font-weight: 400;
    color: #617480;
  }
`;

export const StructureShecdulesPlace = styled.div`
  margin-top: 80px;

  h2 {
    font-weight: 600;
    font-size: 28px;
    color: #123952;
  }

  hr {
    border: 1px solid #dce2e6;

    margin-top: 10px;
    margin-bottom: 40px;
    color: #dce2e5;
  }
`;

export const ContainerShecdulesPlace = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  width: calc(100% + 14px);
`;

export const ContentShecdulesPlace = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dce2e6;
  margin-bottom: 10px;

  display: flex;
  flex-basis: 0px;
  flex-direction: column;
  cursor: pointer;
  transition: all ease 0.2s;
  margin-right: 14px;

  &.focus {
    background: ${shade(0.01, "#dce2e6")};
  }

  span {
    color: #123952;
    font-size: 16px;
    font-weight: 400;
  }

  div {
    color: #123952;
    font-size: 16px;
    font-weight: 700;
    width: 72px;
  }
`;

export const ContainerPlaceContact = styled.div`
  margin-top: 40px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  button {
    width: 225px;
    padding: 18px;
    background: #51b853;
    border-radius: 10px;
    border: 0;
    color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    position: relative;
    transition: all ease 0.2s;

    div {
      position: absolute;
      top: 24px;
      left: 35px;
      width: 10px;
      height: 10px;
      background: #fff;
      z-index: 1;
    }
  }

  button:hover {
    background: ${shade(0.1, "#51b853")};
  }

  div {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-around;

    span {
      font-weight: 600;
      font-size: 24px;
      color: #123952;
    }
  }
`;

export const ContainerPlaceMaps = styled.div`
  margin-top: 80px;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  hr {
    border: 1px solid #dce2e6;

    margin-top: 10px;
    margin-bottom: 40px;
    color: #dce2e5;
  }
`;

export const ContainerStructurePlaceMaps = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-weight: 600;
    font-size: 28px;
    color: #123952;
  }

  span {
    color: #a0acb2;
    font-weight: 500;
    font-size: 14px;
  }
`;

export const ContentPlaceMaps = styled.div``;
