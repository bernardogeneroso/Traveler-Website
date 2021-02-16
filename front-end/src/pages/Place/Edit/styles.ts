import { shade } from "polished";
import styled, { css } from "styled-components";

interface ContentProps {
  maxCharacther: boolean;
}

interface BackgroundImageCityProps {
  image: string;
  imageChange: boolean;
}

interface ContentCategoriesProps {
  selected: boolean;
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

export const ContainerStructure = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-top: 30px;
`;

export const ContainerContent = styled.div`
  form {
    border-radius: 16px;
    background: #fff;

    header {
      height: 143px;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 62px;

      border-top-right-radius: 16px;
      border-top-left-radius: 16px;

      background: linear-gradient(
        90deg,
        #fef7f5 0%,
        rgba(254, 247, 245, 0) 62.99%
      );

      span {
        font-size: 36px;
        font-weight: 600;
        color: #f25d27;
      }
    }

    footer {
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
          width: 150px;
        }
      }

      button {
        padding: 11px 26px;
        border: 0;
        background: #51b853;
        color: #fff;
        border-radius: 10px;

        transition: all ease 0.2s;

        &:hover {
          background: ${shade(0.1, "#51B853")};
        }
      }
    }
  }
`;

export const Content = styled.div<ContentProps>`
  padding: 62px;
  margin-bottom: 40px;

  h3 {
    color: #123952;
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 12px;
  }

  hr {
    border: 1px solid #dce2e6;
  }

  .form-input {
    margin-top: 18px;

    display: flex;
    flex-direction: column;

    label {
      color: #617480;
      font-weight: 400;
      font-size: 14px;
      margin-bottom: 8px;
    }

    input {
      background: #f5f8fa;
      border-radius: 10px;
      border: 1px solid #dce2e6;
      height: 56px;
      padding: 12px 16px;
      color: #123952;
    }
  }

  .form-textarea {
    margin-top: 18px;

    display: flex;
    flex-direction: column;

    position: relative;

    label {
      color: #617480;
      font-weight: 400;
      font-size: 14px;
      margin-bottom: 8px;

      &.error {
        color: #c53030;
      }
    }

    textarea {
      background: #f5f8fa;
      border-radius: 10px;
      border: 1px solid #dce2e6;
      padding: 12px 16px;
      resize: none;
      color: #123952;
      font-size: 16px;
      font-weight: 400;
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
  }

  .form-image-upload {
    margin-top: 18px;

    .focus {
      position: absolute;
      color: #51b853;
    }

    label {
      color: #617480;
      font-weight: 400;
      font-size: 14px;
    }
  }

  .form-categories {
    margin-top: 18px;
    display: flex;
    flex-direction: column;

    label {
      color: #617480;
      font-weight: 400;
      font-size: 14px;
      margin-bottom: 8px;

      &.error {
        color: #c53030;
      }
    }
  }

  .form-attendance {
    h3 {
      margin-top: 42px;
    }

    hr {
      margin-bottom: 36px;
    }
  }

  .form-next-event {
    h3 {
      margin-top: 42px;
    }

    hr {
      margin-bottom: 36px;
    }
  }

  .form-location {
    h3 {
      margin-top: 42px;
    }

    hr {
      margin-bottom: 36px;
    }
  }

  .form-map {
    margin-top: 42px;
  }
`;

export const BackgroundImageCity = styled.div<BackgroundImageCityProps>`
  margin-top: 8px;
  height: 160px;
  width: 100%;
  border-radius: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  ${(props) =>
    props.imageChange &&
    css`
      border: 1px solid #dce2e6;
      background: #f5f8fa;
    `};

  div:nth-child(1) {
    background: url(${(props) => props.image});
    background-size: cover;
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position-y: center;
    border-radius: 16px;
  }

  label {
    padding: 11px 13px;
    background: #fff;
    border-radius: 10px;
    position: absolute;
    top: 15px;
    right: 15px;
    display: flex;
    align-items: center;

    &:hover {
      cursor: pointer;
      background: ${shade(0.06, "#fff")};
    }
  }

  input[type="file"] {
    display: none;
  }
`;

export const ContainerCategories = styled.div`
  width: 100%;

  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  width: calc(100% + 32px);
`;

export const ContentCategories = styled.div<ContentCategoriesProps>`
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
  width: 100%;
  margin-right: 30px;
  margin-bottom: 18px;

  background: ${(props) =>
    props.selected
      ? "linear-gradient(90deg, #FFF8F5 0%, #F5F8FA 100%)"
      : "#f5f8fa"};
  border: 1px solid #dce2e6;
  border-radius: 10px;

  &.error {
    border: 1px solid #c53030;
  }

  div:nth-child(1) {
    padding: 16px 36px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dce2e6;

    &.error {
      border-bottom: 1px solid #c53030;
    }

    .form-checkbox {
      display: block;
      padding: 36px 0px;

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
        background-color: #dcf5dd;
        border: 2px solid #51b853;
      }

      input:checked + label:after {
        content: "";
        display: block;
        position: absolute;
        top: 7px;
        left: 7px;
        width: 7px;
        height: 7px;
        background: #51b853;
        border-radius: 4px;
        border: solid #51b853;
        border-width: 0 3px 3px 0;
        transform: rotate(90deg);
      }
    }
  }

  div:nth-child(2) {
    padding: 36px;

    span {
      color: #123952;
      font-weight: 600;
      font-size: 20px;
    }
  }
`;

export const ContainerAddress = styled.div`
  .form-address,
  .form-phone-number {
    display: flex;
    flex-direction: column;
    margin-bottom: 18px;

    label {
      color: #617480;
      font-weight: 400;
      font-size: 14px;
      margin-bottom: 8px;
    }

    input {
      height: 56px;
      border-radius: 10px;
      border: 1px solid #dce2e6;
      background: #f5f8fa;
      color: #123952;
      padding: 12px 16px;
      font-weight: 400;
      font-size: 16px;
    }
  }
`;

export const ContainerModalFormRegistered = styled.div`
  background-color: #f5f8fa;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  z-index: 9999;
`;

export const DialogModalFormRegistered = styled.div`
  height: 100%;
  margin: 0 auto;
  max-width: 850px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ContentModalFormRegistered = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  text-align: center;

  .structure-left {
    width: 429px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      font-weight: 500;
      font-size: 54px;
      color: #123952;
      margin-top: -80px;
      line-height: 58px;
    }

    p {
      width: 330px;
      margin-top: 30px;
      color: #617480;
      font-weight: 400;
      font-size: 16px;
      line-height: 26px;
    }

    button {
      margin-top: 30px;
      padding: 11px 26px;
      border: 0;
      background: #f25d27;
      color: #fff;
      border-radius: 10px;

      transition: all ease 0.2s;

      &:hover {
        background: ${shade(0.1, "#F25D27")};
      }
    }
  }

  .structure-right {
    width: 450px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;

export const ContainerCheck = styled.div`
  position: relative;
  display: flex;
  place-content: center;
  align-items: center;
  z-index: -1;

  img:nth-child(2) {
    position: absolute;
    top: 124px;
    left: 120px;
  }

  img:nth-child(3) {
    position: absolute;
    top: 155px;
    left: 147px;
  }
`;

export const ContentStructure = styled.div`
  width: 286px;
  position: relative;
`;

export const ContentCities = styled.div`
  text-decoration: none;
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
  width: 100%;
  padding-right: 26px;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-bottom: 36px;
  width: 286px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;

  img {
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    height: 193px;
    width: 286px;
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
    text-align: initial;
    background: #fff;

    h3 {
      font-weight: 600;
      font-size: 20px;
      color: #123952;
    }

    span {
      font-weight: 400;
      font-size: 16px;
      color: #617480;
    }

    &:hover {
      background: ${shade(0.04, "#F5F8FA")};
    }
  }
`;

export const ContainerOptions = styled.div`
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

export const ContentTopRating = styled.div`
  flex-basis: 0px;
  flex-grow: 1;
  max-width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 286px;
  position: relative;

  &.allPlaces {
    margin-bottom: 36px;
  }

  .informations {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;

    &:hover {
      background: ${shade(0.04, "#F5F8FA")};
    }
  }

  img {
    object-fit: cover;
    height: 164px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  h3 {
    font-weight: 600;
    font-size: 20px;
    color: #123952;
    padding: 20px 10px 16px 24px;
    border-left: 1px solid #dce2e5;
    border-right: 1px solid #dce2e5;
    text-align: initial;
  }

  .category {
    padding: 20px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    border-left: 1px solid #dce2e5;
    border-right: 1px solid #dce2e5;
    border-bottom: 1px solid #dce2e5;
    border-top: 1px solid #dce2e5;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    color: #617480;
    font-size: 16px;
    font-weight: 500;
  }
`;

export const Rating = styled.header`
  position: absolute;
  top: -20px;
  left: 17px;
  height: 86px;
  width: 56px;
  background: #f25d27;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
`;

export const ContainerAttendance = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const ContentAttendance = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 56px;
  margin-bottom: 20px;

  .contentInformation {
    span {
      display: inline-block;
      width: 64px;
      font-weight: 500;
      font-size: 16px;
      color: #617480;
      margin-right: 20px;
    }

    button:nth-child(2) {
      border: 1px solid #dce2e6;
      border-radius: 8px 0px 0px 8px;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      background: #f5f8fa;

      color: #617480;
      font-size: 14px;
      font-weight: 400;
      padding: 15px 25px;
      width: 140px;
      height: 100%;

      &.focus {
        background: #f4fef4;
        border: 1px solid #dce2e6;
        color: #51b853;
        font-weight: 500;
        font-size: 14px;
      }

      transition: all ease 0.2s;

      &:hover {
        background: ${shade(0.05, "#f5f8fa")};
      }
    }

    button:nth-child(3) {
      border: 1px solid #dce2e6;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      background: #f5f8fa;

      color: #617480;
      font-size: 14px;
      font-weight: 400;
      padding: 15px 25px;
      width: 140px;
      height: 100%;

      &.focus {
        background: #fef7f5;
        border: 1px solid #dce2e6;
        color: #f25d27;
        font-weight: 500;
        font-size: 14px;
      }

      transition: all ease 0.2s;

      &:hover {
        background: ${shade(0.05, "#f5f8fa")};
      }
    }
  }

  .contentTime {
    display: flex;
    flex-direction: row;

    &.block {
      opacity: 0.6;

      input {
        cursor: no-drop;
      }
    }

    span {
      font-weight: 400;
      font-size: 14px;
      color: #617480;
      margin-right: 6px;
      margin-left: 6px;

      display: flex;
      align-items: center;
    }

    input {
      width: 96px;

      background: #f5f8fa;
      border: 1px solid #dce2e6;
      border-radius: 10px;

      color: #123952;
      font-weight: 500;
      font-size: 16px;

      &[type="text" i] {
        padding: 1rem;
      }
    }
  }
`;

export const ContainerNextEvent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 56px;

  span {
    font-weight: 400;
    font-size: 14px;
    color: #617480;

    &.first {
      margin-right: 14px;
    }

    &.last {
      margin-left: 14px;
      margin-right: 14px;
    }
  }

  .format-date-picker {
    .react-date-picker__wrapper {
      border: 1px solid #dce2e6;
      background: #f5f8fa;
      border-radius: 10px;
      height: 56px;
      width: 170px;

      .react-date-picker__inputGroup {
        text-align: center;

        .react-date-picker__inputGroup__leadingZero {
          color: #123952;
          font-size: 16px;
          font-weight: 500;
        }

        input {
          background: none;
          border: none;
          color: #123952;
          font-size: 16px;
          font-weight: 500;

          &[type="text" i] {
            padding: 1rem;
          }
        }
      }
    }

    .react-calendar__tile--now {
      background: #f25d27;
      color: white;
    }

    .react-calendar__tile--active {
      background: #123952;
    }
  }

  input {
    height: 100%;
    background: #f5f8fa;
    border: 1px solid #dce2e6;
    border-radius: 10px;
    width: 170px;

    color: #123952;
    font-size: 16px;
    font-weight: 500;

    &[type="text" i] {
      padding: 1rem;
    }
  }
`;
