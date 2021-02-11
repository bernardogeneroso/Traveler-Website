import styled, { keyframes } from "styled-components";
import { shade } from "polished";

interface ContainerContentProps {
  removeFilter: boolean;
}

export const ContainerLoading = styled.div`
  background-color: rgb(18, 57, 82, 0.9);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  z-index: 9999;
`;

export const DialogLoading = styled.div`
  height: 100%;
  margin: 0 auto;
  max-width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Loadbar = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const spinner = keyframes`
  from{
    transform:rotate(0deg)
  }

  to{
    transform:rotate(360deg)
  }
`;
export const Spinner = styled.div`
  animation: ${spinner} 1s linear 0s infinite;

  i {
    color: white;
    font-size: 2rem;
  }
`;

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  background: #f5f8fa;
`;

export const ContainerContent = styled.div<ContainerContentProps>`
  height: ${(props) =>
    props.removeFilter ? "calc(100vh - 128px)" : "calc(100vh - 96px)"};
  max-width: 1120px;
  margin: 0 auto;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding-top: 26px;

  h1 {
    font-weight: 600;
    font-size: 32px;
    color: #123952;
  }
`;

export const HeaderFilter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    color: #a0acb2;
    padding-left: 12px;
    padding-right: 12px;
    padding-bottom: 14px;
    border-bottom: 2px solid #dce2e5;
    cursor: pointer;
  }

  .focus {
    color: #123952;
    font-weight: 700;
    border-bottom: 2px solid #f25d27;
  }

  .focus-div-arrow {
    background-image: linear-gradient(45deg, #f25d27 50%, transparent 50%),
      linear-gradient(135deg, transparent 50%, #f25d27 50%) !important;
    background-position: calc(100% - 15px) 6px, calc(100% - 20px) 6px,
      calc(100% - 2.5em) 0.5em !important;
    background-size: 5px 5px, 6px 5px, 1px 1.5em !important;
    background-repeat: no-repeat !important;
    outline: 0 !important;
  }

  div:nth-child(3) {
    width: 75px;

    background-image: linear-gradient(45deg, transparent 50%, #f25d27 50%),
      linear-gradient(135deg, #f25d27 50%, transparent 50%);
    background-position: calc(100% - 20px) calc(1em + -10px),
      calc(100% - 15px) calc(1em + -10px), calc(100% - 2.5em) 0.5em;
    background-size: 5px 5px, 5px 5px, 1px 1.5em;
    background-repeat: no-repeat;
  }
`;

export const ContainerCities = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  width: calc(100% + 36px);
  overflow-y: auto;

  margin-top: 30px;
`;

export const ContentStructure = styled.div`
  width: 250px;
  position: relative;
`;

export const ContentCities = styled.div`
  text-decoration: none;
  max-width: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-right: 39px;
  margin-bottom: 26px;
  width: 250px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;

  .opacity {
    opacity: 0.6;
  }

  img {
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    height: 193px;
    width: 250px;
    object-fit: cover;
  }

  .informations {
    border-bottom: 1px solid #dce2e5;
    border-left: 1px solid #dce2e5;
    border-right: 1px solid #dce2e5;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 16px;
    margin-top: -7px;

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

    &:hover {
      background: ${shade(0.04, "#F5F8FA")};
    }
  }
`;

export const ContainerOptionsCity = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  flex-direction: row;

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

    display: flex;
    place-content: center;
    align-items: center;
  }
`;

export const ContentOptionEdit = styled.div``;

export const ContentOptionDelete = styled.div``;

export const ContainerCitiesError = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  padding-top: 160px;

  img {
    height: 80px;

    margin-bottom: 10px;
  }

  h2 {
    font-weight: 500;
    color: #617480;
  }
`;
