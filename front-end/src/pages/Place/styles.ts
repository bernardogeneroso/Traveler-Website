import styled, { css, keyframes } from "styled-components";
import { shade } from "polished";

interface ContainerProps {
  overflowHidden: boolean;
}

interface ContainerPlaceInformationProps {
  filterBlur: boolean;
}

interface PlaceBackgroundProps {
  image: string;
}

interface ContentRatingAddEvaluationProps {
  firstItem: boolean;
  lastItem: boolean;
  checked: boolean;
}

interface FirstLineModalAddEvaluationProps {
  fileUploaded: boolean;
}

interface SecondLineModalAddEvaluationProps {
  maxCharacther: boolean;
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

export const Container = styled.div<ContainerProps>`
  background: #f5f8fa;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: ${(props) => (props.overflowHidden ? "hidden" : "auto")};
`;

export const ContainerPlaceInformation = styled.div<ContainerPlaceInformationProps>`
  display: flex;
  justify-content: row;
  flex-wrap: wrap;

  ${(props) =>
    props.filterBlur &&
    css`
      filter: blur(3px);
    `}
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

export const PlaceIcon = styled.div`
  position: fixed;
  top: 30px;
  right: 30px;
  height: 60px;
  width: 60px;
  background: #fff;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
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

export const ContainerNextEditionEvent = styled.div`
  margin-top: 80px;

  display: flex;
  flex-direction: column;

  font-weight: 600;
  color: #123952;
  font-size: 24px;
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

  a {
    text-decoration: none;

    span {
      color: #a0acb2;
      font-weight: 500;
      font-size: 14px;
      transition: all ease 0.2s;

      &:hover {
        color: ${shade(0.2, "#a0acb2")};
      }
    }
  }
`;

export const ContentPlaceMaps = styled.div`
  z-index: 0;
`;

export const ContentPlaceAddress = styled.div`
  margin-top: 20px;

  color: #a0acb2;
  font-weight: 400;
  font-size: 16px;
`;

export const ContainerPlaceRating = styled.div`
  margin-top: 80px;

  hr {
    border: 1px solid #dce2e6;

    margin-top: 10px;
    margin-bottom: 40px;
    color: #dce2e5;
  }
`;

export const ContentStructurePlaceRating = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  div:nth-child(1) {
    display: flex;
    flex-direction: row;
    width: 240px;
    justify-content: space-between;

    h2 {
      font-weight: 600;
      font-size: 28px;
      color: #123952;
    }

    div {
      display: flex;
      flex-direction: row;
      width: 78px;
      justify-content: space-evenly;

      span {
        font-weight: 600;
        color: #f25d27;
        font-size: 20px;
      }
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 160px;

    span {
      color: #a0acb2;
      font-weight: 400;
      font-size: 16px;
      cursor: pointer;

      transition: all ease 0.2s;

      &:hover {
        color: ${shade(0.2, "#a0acb2")};
      }
    }
  }
`;

export const ContainerPlaceRatingComments = styled.div`
  margin-bottom: 40px;
`;

export const ContentPlaceRatingComment = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 26px;
`;

export const PlaceRatingCommentLeftImage = styled.div`
  margin-right: 14px;

  img {
    height: 64px;
    width: 64px;
  }
`;

export const PlaceRatingCommentInformation = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const PlaceRatingCommentHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  div:nth-child(1) {
    font-weight: 600;
    font-size: 18px;
    color: #617480;
  }
`;

export const PlaceRatingCommentContent = styled.div`
  margin-top: 12px;
  padding-bottom: 20px;
  border-bottom: 1px solid #dce2e5;

  div {
    margin-top: 10px;
  }
`;

export const ContainerModalAddEvaluation = styled.div`
  background-color: rgb(18, 57, 82, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  z-index: 9999;
`;

export const DialogModalAddEvaluation = styled.div`
  height: 100%;
  margin: 0 auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ContentModalAddEvaluation = styled.div`
  background: #f5f8fa;
  border-radius: 20px;
`;

export const HeaderModalAddEvaluation = styled.div`
  padding: 26px 30px 20px 30px;
  background: #fff;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dce2e5;

  h2 {
    font-weight: 600;
    font-size: 24px;
    color: #123952;
  }

  div {
    padding: 8px;
    border: 1px solid #dce2e5;
    border-radius: 10px;
    display: flex;

    &:hover {
      cursor: pointer;
      background: ${shade(0.03, "#fff")};
    }
  }
`;

export const BodyModalAddEvaluation = styled.div`
  padding: 26px 30px 20px 30px;
`;

export const FirstLineModalAddEvaluation = styled.div<FirstLineModalAddEvaluationProps>`
  height: 43px;
  margin-bottom: 18px;
  display: flex;
  flex-direction: row;

  div:nth-child(1) {
    margin-right: 12px;
    width: 286px;
    display: flex;
    align-items: center;

    input[type="file"] {
      display: none;
    }

    label {
      padding: 11px 24px;
      border-radius: 10px;

      ${(props) =>
        props.fileUploaded
          ? css`
              background: linear-gradient(
                90deg,
                #dcf5dd 0%,
                rgba(220, 245, 221, 0) 100%
              );
              cursor: pointer;
              transition: all ease 0.2s;
              color: #51b853;
              width: 100%;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-around;

              span:nth-child(1) {
                font-weight: 500;
                font-size: 16px;
              }

              span:nth-child(2) {
                font-weight: 400;
                font-size: 12px;
              }

              span:nth-child(2):hover {
                color: ${shade(0.2, "#51b853")};
              }
            `
          : css`
              padding: 11px 24px;
              border-radius: 10px;
              font-weight: 400;
              font-size: 16px;
              color: #fff;
              background: #115d8c;
              cursor: pointer;
              transition: all ease 0.2s;
              display: flex;
              justify-content: space-between;
              width: 100%;

              &:hover {
                background: ${shade(0.2, "#115d8c")};
              }
            `}
    }
  }

  div:nth-child(2) {
    height: 100%;
    width: 100%;

    input {
      height: 100%;
      width: 100%;
      color: #000;
      padding: 6px 12px;
      border-radius: 10px;
      border: 1px solid #dce2e5;
      font-size: 14px;
    }

    input::placeholder {
      color: #a0acb2;
      font-size: 14px;
      font-weight: 400;
    }
  }
`;

export const SecondLineModalAddEvaluation = styled.div<SecondLineModalAddEvaluationProps>`
  position: relative;

  textarea {
    width: 100%;
    resize: none;
    outline: none;
    overflow: hidden;
    border-radius: 10px;
    border: 1px solid #dce2e6;
    padding: 16px;
  }

  textarea::placeholder {
    color: #a0acb2;
    font-weight: 400;
    font-size: 14px;
  }

  span {
    position: absolute;
    bottom: 0;
    right: 0;
    margin-bottom: 12px;
    margin-right: 12px;

    color: ${(props) => (props.maxCharacther ? "#F25D27" : "#a0acb2")};
    font-weight: 400;
    font-size: 12px;
  }
`;

export const ThirdLineModalAddEvaluation = styled.div`
  margin-top: 10px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
  align-items: center;

  span {
    font-weight: 500;
    font-size: 16px;
    color: #f25d27;
  }
`;

export const ContainerRatingAddEvaluation = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ContentRatingAddEvaluation = styled.div<ContentRatingAddEvaluationProps>`
  padding: 7px 28px;
  display: flex;
  border: 0.5px solid ${(props) => (props.checked ? "#F1BEAC" : "#dce2e5")};
  background: ${(props) => (props.checked ? "#FEF7F5" : "#fff")};
  cursor: pointer;

  ${(props) =>
    props.firstItem
      ? css`
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        `
      : props.lastItem
      ? css`
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        `
      : ""}

  transition: all ease 0.2s;

  &:hover {
    background: #fef7f5;
    border: 0.5px solid #f1beac;
  }
`;

export const FooterFormModalAddEvaluation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-top: 30px;

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    svg {
      margin-right: 12px;
    }

    span {
      color: #617480;
      font-weight: 400;
      font-size: 14px;
      width: 200px;
    }
  }

  button {
    padding: 11px 20px;
    border: 0;
    background: #51b853;
    color: #fff;
    border-radius: 10px;

    transition: all ease 0.2s;
  }

  button:hover {
    background: ${shade(0.1, "#51b853")};
  }
`;

export const ContainerModalSeeEvaluation = styled.div`
  background-color: rgb(18, 57, 82, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  z-index: 9999;
`;

export const DialogModalSeeEvaluation = styled.div`
  height: calc(100% - 18vh);
  margin: 0 auto;
  max-width: 740px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ContentModalSeeEvaluation = styled.div`
  background: #f5f8fa;
  border-radius: 20px;
`;

export const HeaderModalSeeEvaluation = styled.div`
  padding: 26px 30px 20px 30px;
  background: #fff;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dce2e5;

  div:nth-child(1) {
    width: 274px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    span:nth-child(1) {
      font-size: 24px;
      color: #f25d27;
      font-weight: 600;
    }

    span:nth-child(2) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      color: #617480;
      font-weight: 600;
      font-size: 16px;

      svg {
        margin-right: 12px;
      }
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    span:nth-child(1) {
      color: #617480;
      font-weight: 500;
      font-size: 14px;
      margin-right: 16px;

      &:hover {
        cursor: pointer;
        color: ${shade(0.3, "#617480")};
      }
    }

    span:nth-child(2) {
      padding: 8px;
      border: 1px solid #dce2e5;
      border-radius: 10px;
      display: flex;

      &:hover {
        cursor: pointer;
        background: ${shade(0.03, "#fff")};
      }
    }
  }
`;

export const BodyModalSeeEvaluation = styled.div`
  display: flex;
  padding: 26px 30px 20px 30px;
  max-height: 490px;
`;

export const ContainerPlaceRatingCommentsModalSeeEvaluation = styled.div`
  overflow-y: auto;
  padding-right: 50px;

  &::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  &::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background: #11678c;
    border: 0px none #ffffff;
    border-radius: 40px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #11678c;
  }

  &::-webkit-scrollbar-thumb:active {
    background: #11678c;
  }

  &::-webkit-scrollbar-track {
    background: #d7e0e5;
    border: 0px none #ffffff;
    border-radius: 50px;
  }

  &::-webkit-scrollbar-track:hover {
    background: #d7e0e5;
  }

  &::-webkit-scrollbar-track:active {
    background: #d7e0e5;
  }
  &::-webkit-scrollbar-corner {
    background: transparent;
  }
`;

export const ContainerNotificationSendEvaluation = styled.div`
  background-color: rgb(18, 57, 82, 0.9);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  z-index: 9999;
`;

export const DialogModalNotificationSendEvaluation = styled.div`
  height: 100%;
  margin: 0 auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ContentNotificationSendEvaluation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  img {
    margin-bottom: 30px;
  }

  h1 {
    margin-bottom: 6px;
    font-size: 36px;
    font-weight: 500;
    color: #fff;
  }

  span {
    margin-bottom: 30px;
    width: 214px;
    font-weight: 400;
    font-size: 16px;
    color: #a0acb2;
  }

  button {
    border: 0;
    padding: 11px 20px;
    background: #f25d27;
    color: #fff;
    font-weight: 400;
    font-size: 16px;
    border-radius: 10px;
  }
`;
