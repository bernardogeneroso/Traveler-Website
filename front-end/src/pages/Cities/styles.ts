import styled from "styled-components";

export const Container = styled.div`
  height: 100%;

  background: #f5f8fa;
`;

export const ContainerContent = styled.div`
  height: calc(100vh - 96px);
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
  width: calc(100% + 40px);
  height: calc(100% - 96px);
  overflow-y: auto;

  margin-top: 30px;
`;

export const ContentCities = styled.div`
  margin-bottom: 26px;
  width: 250px;

  cursor: pointer;

  transition: all ease 0.4s;

  &:hover {
    transform: scale(0.9);
  }

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

export const ContainerCitiesError = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  padding-bottom: 160px;

  img {
    height: 80px;

    margin-bottom: 10px;
  }

  h2 {
    font-weight: 500;
    color: #617480;
  }
`;
