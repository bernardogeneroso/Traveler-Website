import React from "react";
import { FiSearch, FiX, FiArrowLeft } from "react-icons/fi";

import travelerLogo from "../../../assets/header/Logo.png";

import {
  Container,
  ContainerStructure,
  ContainerLogo,
  ContainerMiddle,
  ContentMiddleCity,
  ContentMiddleSearchCity,
  ContainerRestrictAccess,
} from "./styles";

interface HeaderProps {
  restrict?: boolean;
  lastPage?: string;
  middleContent?: "city" | "search" | "none";
  cityName?: string;
}

const Header: React.FC<HeaderProps> = ({
  restrict,
  lastPage,
  middleContent,
  cityName,
}) => {
  return (
    <Container
      middleContent={
        middleContent === "city" || middleContent === "search" ? true : false
      }
    >
      <ContainerStructure>
        <ContainerLogo>
          <img src={travelerLogo} alt="Traveler" />

          {lastPage && (
            <div>
              <FiArrowLeft size={22} color="#A0ACB2" />
            </div>
          )}
        </ContainerLogo>

        <ContainerMiddle>
          {middleContent === "city" && (
            <ContentMiddleCity>{cityName}</ContentMiddleCity>
          )}
          {middleContent === "search" && (
            <ContentMiddleSearchCity>
              <FiSearch size={22} color="#A0ACB2" />
              <input type="text" placeholder="Qual é a cidade que procura?" />
              <FiX size={22} color="#A0ACB2" />
            </ContentMiddleSearchCity>
          )}
        </ContainerMiddle>

        {restrict && (
          <ContainerRestrictAccess>
            <button>Acesso restrito</button>
          </ContainerRestrictAccess>
        )}
      </ContainerStructure>
    </Container>
  );
};

export default Header;
