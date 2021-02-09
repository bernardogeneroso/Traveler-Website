import React from "react";
import { Link } from "react-router-dom";
import { FiEdit3, FiTrash, FiArrowLeft } from "react-icons/fi";

import {
  Container,
  ContainerStructure,
  ContainerMiddle,
  ContainerLeft,
  ContainerOptions,
  ContainerStages,
} from "./styles";

interface HeaderProps {
  lastPage?: string;
  cityName?: string;
  middleContent?: string;
  stage?: number;
  cityId?: number;
  placeId?: number;
  buttonPosition?: string;
}

const Header: React.FC<HeaderProps> = ({
  lastPage,
  cityName,
  middleContent,
  stage,
  cityId,
  placeId,
  buttonPosition,
}) => {
  return (
    <Container>
      <ContainerStructure>
        <ContainerLeft placeActive={placeId ? true : false}>
          {lastPage && (
            <Link to={`/${lastPage}`}>
              <div className="lastPage">
                <FiArrowLeft size={22} color="#A0ACB2" />
              </div>
            </Link>
          )}

          {cityName && <h1>{cityName}</h1>}

          {placeId && (
            <ContainerOptions>
              <div>
                <FiEdit3 size={20} color="#617480" />
              </div>
              <div>
                <FiTrash size={20} color="#617480" />
              </div>
            </ContainerOptions>
          )}
        </ContainerLeft>

        {middleContent && <ContainerMiddle>{middleContent}</ContainerMiddle>}

        <ContainerOptions>
          {cityId && (
            <>
              <div className="edit">
                <FiEdit3 size={20} color="#617480" />
              </div>
              <div className="trash">
                <FiTrash size={20} color="#617480" />
              </div>
            </>
          )}

          {buttonPosition && (
            <Link to={`/${buttonPosition}/create`}>
              <button>
                +{" "}
                {buttonPosition === "cities"
                  ? "Adicionar uma cidade"
                  : buttonPosition === "city"
                  ? "Adicionar um local"
                  : "Adicionar uma categoria"}
              </button>
            </Link>
          )}

          {stage && (
            <ContainerStages>
              <span className={stage === 1 ? "focus" : ""}>01</span> -{" "}
              <span className={stage === 2 ? "focus" : ""}>02</span>
            </ContainerStages>
          )}
        </ContainerOptions>
      </ContainerStructure>
    </Container>
  );
};

export default Header;
