import React from "react";
import { FiSearch, FiX, FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import travelerLogo from "../../../assets/header/Logo.png";
import { useAuth } from "../../../hooks/Auth";
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
  restrict = false,
  lastPage,
  middleContent = "none",
}) => {
  const history = useHistory();
  const { user } = useAuth();
  const { searchCities, searchFilter, cleanSearchFilter } = useCities();

  return (
    <Container
      middleContent={
        middleContent === "city" || middleContent === "search" || lastPage
          ? true
          : false
      }
    >
      <ContainerStructure>
        <ContainerLogo>
          <Link to="/">
            <img src={travelerLogo} alt="Traveler" />
          </Link>

          {lastPage && (
            <div onClick={() => history.goBack()}>
              <FiArrowLeft size={22} color="#A0ACB2" />
            </div>
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

        {restrict && !user && (
          <Link to="/signin">
            <ContainerRestrictAccess>
              <button>Acesso restrito</button>
            </ContainerRestrictAccess>
          </Link>
        )}
      </ContainerStructure>
    </Container>
  );
};

export default Header;
