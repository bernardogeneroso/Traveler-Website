import React from "react";
import { FiSearch, FiX, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

import travelerLogo from "../../../assets/header/Logo.png";
import { useCities } from "../../../hooks/CitiesManager";

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
}

const Header: React.FC<HeaderProps> = ({
  restrict,
  lastPage,
  middleContent,
}) => {
  const { searchCities, searchFilter, cleanSearchFilter } = useCities();

  return (
    <Container
      middleContent={
        middleContent === "city" || middleContent === "search" ? true : false
      }
    >
      <ContainerStructure>
        <ContainerLogo>
          <Link to="/">
            <img src={travelerLogo} alt="Traveler" />
          </Link>

          {lastPage && (
            <Link to={`/${lastPage}`}>
              <div>
                <FiArrowLeft size={22} color="#A0ACB2" />
              </div>
            </Link>
          )}
        </ContainerLogo>

        <ContainerMiddle>
          {middleContent === "city" && (
            <ContentMiddleCity>Cidade</ContentMiddleCity>
          )}
          {middleContent === "search" && (
            <ContentMiddleSearchCity>
              <FiSearch
                size={22}
                color={searchCities !== "" ? "#F25D27" : "#A0ACB2"}
              />
              <input
                type="text"
                placeholder="Qual é a cidade que procura?"
                onChange={searchFilter}
                value={searchCities}
              />
              {searchCities !== "" && (
                <FiX
                  size={22}
                  color="#A0ACB2"
                  style={{ cursor: "pointer" }}
                  onClick={cleanSearchFilter}
                />
              )}
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
