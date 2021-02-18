import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FiEdit3, FiTrash, FiArrowLeft } from "react-icons/fi";
import { IconType } from "react-icons";

import { CityProps } from "../../../pages/Cities";
import { PlaceProps } from "../../../pages/City";
import ModalRemove, { ModalRemoceProperties } from "../ModalRemove";

import {
  Container,
  ContainerStructure,
  ContainerMiddle,
  ContainerLeft,
  ContainerOptions,
  ContainerStages,
  ContainercityEditName,
  ContainerEvaluationsFilter,
} from "./styles";

interface HeaderProps {
  lastPage?: string;
  cityName?: string;
  cityEditName?: string;
  MiddleContent?: {
    message: string;
    Icon?: IconType;
  };
  evaluationFilter?: boolean;
  stage?: number;
  city?: CityProps;
  place?: PlaceProps;
  buttonPosition?: string;
}

const Header: React.FC<HeaderProps> = ({
  lastPage,
  cityName,
  cityEditName,
  evaluationFilter,
  MiddleContent,
  stage,
  city,
  place,
  buttonPosition,
}) => {
  const [modalRemoveCity, setModalRemoveCity] = useState<ModalRemoceProperties>(
    {
      toggle: false,
    }
  );

  const handleSetModalRemoveCityID = useCallback((city: CityProps) => {
    setModalRemoveCity({
      toggle: true,
      city,
    });
  }, []);

  const handleSetModalRemovePlaceID = useCallback((place: PlaceProps) => {
    setModalRemoveCity({
      toggle: true,
      place,
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
        <ContainerLeft placeActive={place ? true : false}>
          {lastPage && (
            <Link to={`/${lastPage}`}>
              <div className="lastPage">
                <FiArrowLeft size={22} color="#A0ACB2" />
              </div>
            </Link>
          )}

          {cityName && <h1>{cityName}</h1>}

          {place && (
            <ContainerOptions>
              <Link to={`/place/edit/${place.id}`}>
                <div className="edit">
                  <FiEdit3 size={20} color="#617480" />
                </div>
              </Link>
              <div
                className="trash"
                onClick={() => handleSetModalRemovePlaceID(place)}
              >
                <FiTrash size={20} color="#617480" />
              </div>
            </ContainerOptions>
          )}
        </ContainerLeft>

        {MiddleContent && (
          <ContainerMiddle className={MiddleContent.Icon ? "active" : ""}>
            {MiddleContent.Icon && <MiddleContent.Icon />}
            {MiddleContent.message}
          </ContainerMiddle>
        )}

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

          {evaluationFilter && (
            <ContainerEvaluationsFilter>
              <div className="focus">Todas</div>
              <div>Recentes</div>
              <div>Velhos</div>
              <div>Aceitos</div>
              <div>Recusados</div>
            </ContainerEvaluationsFilter>
          )}
        </ContainerOptions>
      </ContainerStructure>

      {modalRemoveCity.toggle && (
        <ModalRemove
          city={city}
          place={place}
          handleToggle={handleToggleModalRemoveCity}
          redirect
        />
      )}
    </Container>
  );
};

export default Header;
