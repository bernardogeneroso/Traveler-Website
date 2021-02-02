import styled from "styled-components";

interface BackgroundProps {
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

export const ContainerBackground = styled.div`
  width: 100%;
  height: 400px;
`;

export const Background = styled.div<BackgroundProps>`
  width: 100%;
  height: 100%;

  background-image: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
`;

export const ContainerContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`;

export const ContainerCityInformation = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  margin-top: 80px;
  margin-bottom: 80px;
`;

export const AboutCityInformation = styled.div`
  max-width: 600px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  h1 {
    font-weight: 600;
    font-size: 54px;
    color: #123952;
  }

  p {
    margin-top: 40px;
    font-weight: 400;
    color: #123952;
    font-size: 22px;
  }

  span {
    margin-top: 40px;
    font-weight: 400;
    color: #617480;
    font-size: 16px;
  }
`;

export const PlacesCityInformation = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
`;

export const ContainerPlace = styled.div`
  flex-basis: 0px;
  flex-grow: 1;
  max-width: 100%;
  position: relative;
  width: 100%;
  height: 230px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-around;

  margin-left: 16px;
  border: 1px solid #dce2e5;
  background: #fff;
  border-radius: 20px;

  div:nth-child(1) {
    padding: 16px;
    padding-left: 32px;
    border-bottom: 1px solid #dce2e5;
  }

  div:nth-child(2) {
    height: 112px;
    padding: 12px;
    padding-top: 0;
    padding-left: 20px;
    padding-right: 7px;

    h1 {
      margin-top: 30px;
      font-weight: 600;
      font-size: 30px;
      color: #123952;
    }

    span {
      margin-top: 6px;
      font-weight: 400;
      color: #617480;
      font-size: 14px;
    }
  }
`;

export const ContainerTopRating = styled.div`
  margin-top: 100px;

  h2 {
    font-weight: 600;
    font-size: 30px;
    color: #123952;
    margin-bottom: 40px;
  }
`;

export const ContainerTops = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: calc(100% + 26px);
`;

export const ContentTopRating = styled.div`
  flex-basis: 0px;
  max-width: 100%;
  position: relative;
  padding-right: 26px;
  padding-left: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 286px;
  margin-bottom: 16px;
  position: relative;

  cursor: pointer;

  transition: all ease 0.4s;

  &:hover {
    transform: scale(0.9);
  }

  img {
    height: 164px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  h3 {
    font-weight: 600;
    font-size: 18px;
    color: #123952;
    padding: 20px 10px 16px 24px;
    border-left: 1px solid #dce2e5;
    border-right: 1px solid #dce2e5;
  }

  div {
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

export const ContainerHighlight = styled.div`
  margin-top: 55px;
  margin-bottom: 60px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  transition: all ease 0.4s;

  &:hover {
    transform: scale(0.9);
  }
`;

export const ContentHighlight = styled.div`
  width: 555px;

  padding: 46px;

  background: #fff;
  border-top: 1px solid #dce2e5;
  border-left: 1px solid #dce2e5;
  border-bottom: 1px solid #dce2e5;
  border-bottom-left-radius: 16px;
  border-top-left-radius: 16px;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;

  div:nth-child(1) {
    width: 145px;
    background: #f25d27;
    border-radius: 100px;
    padding: 6px 10px 6px 10px;

    color: #fff;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  div:nth-child(2) {
    h2 {
      margin-bottom: 20px;
    }

    p {
      color: #617480;
      font-weight: 400;
    }
  }
`;

export const ContentHighlightImage = styled.div`
  height: 294px;
  position: relative;

  img {
    width: 563px;
    height: 293px;

    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
  }
`;

export const ContainerPlacesFilter = styled.div`
  margin-bottom: 30px;
`;

export const ContentPlacesFilter = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 30px;

  h2 {
    font-weight: 600;
    font-size: 30px;
    color: #123952;
    margin-bottom: 40px;
  }
`;

export const PlacesFilter = styled.div`
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
`;

export const ContainerAllPlaces = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: calc(100% + 26px);
`;

export const ContentAllPlaces = styled.div`
  flex-basis: 0px;
  max-width: 100%;
  position: relative;
  padding-right: 26px;
  padding-left: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 286px;
  margin-bottom: 16px;
  position: relative;

  cursor: pointer;

  transition: all ease 0.4s;

  &:hover {
    transform: scale(0.9);
  }

  img {
    height: 164px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  h3 {
    font-weight: 600;
    font-size: 18px;
    color: #123952;
    padding: 20px 10px 16px 24px;
    border-left: 1px solid #dce2e5;
    border-right: 1px solid #dce2e5;
  }

  div {
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
  }
`;
