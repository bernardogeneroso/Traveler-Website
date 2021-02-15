import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FiEdit3, FiTrash, FiArrowLeft } from "react-icons/fi";

import { CityProps } from "../../../pages/Cities";
import ModalRemoveCity, { ModalRemoceCityProperties } from "../ModalRemoveCity";

import {
  Container,
  ContainerStructure,
  ContainerMiddle,
  ContainerLeft,
  ContainerOptions,
  ContainerStages,
  ContainercityEditName,
} from "./styles";

interface HeaderProps {
  lastPage?: string;
  cityName?: string;
  cityEditName?: string;
  middleContent?: string;
  stage?: number;
  city?: CityProps;
  placeId?: number;
  buttonPosition?: string;
}

const Header: React.FC<HeaderProps> = ({
  lastPage,
  cityName,
  cityEditName,
  middleContent,
  stage,
  city,
  placeId,
  buttonPosition,
}) => {
  const [
    modalRemoveCity,
    setModalRemoveCity,
  ] = useState<ModalRemoceCityProperties>({
    toggle: false,
  });

  const handleSetModalRemoveCityID = useCallback((city: CityProps) => {
    setModalRemoveCity({
      toggle: true,
      city,
    });
  }, []);

  const handleToggleModalRemoveCity = useCallback(() => {
    setModalRemoveCity((state) => ({
      ...state,
      toggle: !state.toggle,
    }));
  }, []);

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
              <div className="edit">
                <FiEdit3 size={20} color="#617480" />
              </div>
              <div className="trash">
                <FiTrash size={20} color="#617480" />
              </div>
            </ContainerOptions>
          )}
        </ContainerLeft>

        {middleContent && <ContainerMiddle>{middleContent}</ContainerMiddle>}

        <ContainerOptions>
          {city && (
            <>
              <Link to={`/city/edit/${city.id}`}>
                <div className="edit">
                  <FiEdit3 size={20} color="#617480" />
                </div>
              </Link>
              <div
                className="trash"
                onClick={() => handleSetModalRemoveCityID(city)}
              >
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

          {cityEditName && (
            <ContainercityEditName>{cityEditName}</ContainercityEditName>
          )}
        </ContainerOptions>
      </ContainerStructure>

      {modalRemoveCity.toggle && (
        <ModalRemoveCity
          city={city}
          handleToggle={handleToggleModalRemoveCity}
          redirect
        />
      )}
    </Container>
  );
};

export default Header;
