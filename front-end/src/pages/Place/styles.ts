import styled, { css } from "styled-components";
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

export const ContentPlaceMaps = styled.div``;

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
`;

export const PlaceRatingCommentLeftImage = styled.div`
  margin-right: 14px;

  img {
    height: 64px;
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
  margin-bottom: 26px;
  padding-bottom: 20px;

  border-bottom: 1px solid #dce2e5;
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
