import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { CgSpinnerTwo } from "react-icons/cg";
import { FiEdit3, FiTrash } from "react-icons/fi";

import Header from "../../components/Main/Header";
import HeaderAdmin from "../../components/Main/HeaderAdmin";
import MenuAdmin from "../../components/Main/MenuAdmin";
import ModalRemove, {
  ModalRemoceProperties,
} from "../../components/Main/ModalRemove";
import { useCities } from "../../hooks/CitiesManager";
import { useAuth } from "../../hooks/Auth";
import EmojySad from "../../assets/cities/emoji_sad.png";

import {
  Container,
  ContainerContent,
  HeaderContainer,
  HeaderFilter,
  ContainerCities,
  ContentCities,
  ContentStructure,
  ContainerOptionsCity,
  ContainerCitiesError,
  ContainerLoading,
  DialogLoading,
  Loadbar,
  Spinner,
} from "./styles";

export interface CityProps {
  id: number;
  name: string;
  image: string;
  description: string;
  locals: string;
  created_at: string;
  updated_at: string;
  opacity?: 0 | 1;
}

const Citites: React.FC = () => {
  const { user } = useAuth();
  const { cities, filterOption, filterOptions, loading } = useCities();

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

  const handleToggleModalRemoveCity = useCallback(() => {
    setModalRemoveCity((state) => ({
      ...state,
      toggle: !state.toggle,
    }));
  }, []);

  return (
    <>
      {loading ? (
        <ContainerLoading>
          <DialogLoading>
            <Loadbar>
              <Spinner>
                <CgSpinnerTwo size={48} color="#fff" />
              </Spinner>
            </Loadbar>
          </DialogLoading>
        </ContainerLoading>
      ) : (
        <Container>
          {user ? (
            <>
              <MenuAdmin />
              <HeaderAdmin cityName="Cidades" buttonPosition="cities/stage01" />
            </>
          ) : (
            <Header restrict middleContent="search" />
          )}

          <ContainerContent removeFilter={!!user}>
            {!user && (
              <HeaderContainer>
                <h1>Selecione uma cidade</h1>

                <HeaderFilter>
                  <div
                    className={filterOption === 1 ? "focus" : ""}
                    onClick={() => filterOptions(1)}
                  >
                    Todas
                  </div>
                  <div
                    className={filterOption === 2 ? "focus" : ""}
                    onClick={() => filterOptions(2)}
                  >
                    Mais vistos
                  </div>
                  <div
                    className={
                      filterOption === 3 ? "focus focus-div-arrow " : ""
                    }
                    onClick={() => filterOptions(3)}
                  >
                    {filterOption === 3 ? "Z-A" : "A-Z"}
                  </div>
                </HeaderFilter>
              </HeaderContainer>
            )}

            <ContainerCities>
              {cities ? (
                cities.map((city) => (
                  <ContentCities
                    style={{
                      opacity:
                        city.opacity !== undefined
                          ? !city.opacity
                            ? 0.6
                            : 1
                          : 1,
                    }}
                    key={city.id}
                  >
                    <ContentStructure>
                      <img
                        src={`${process.env.REACT_APP_API_URL}/cities/image/${city.image}`}
                        alt={city.name}
                      />

                      <Link to={`/city/${city.id}`}>
                        <div className="informations">
                          <h3>{city.name}</h3>
                          <span>{city.locals} locais</span>
                        </div>
                      </Link>

                      {!!user && (
                        <ContainerOptionsCity>
                          <Link to={`/city/edit/${city.id}`}>
                            <div>
                              <FiEdit3 size={20} color="#617480" />
                            </div>
                          </Link>
                          <div onClick={() => handleSetModalRemoveCityID(city)}>
                            <FiTrash size={20} color="#617480" />
                          </div>
                        </ContainerOptionsCity>
                      )}
                    </ContentStructure>
                  </ContentCities>
                ))
              ) : (
                <ContainerCitiesError>
                  <img src={EmojySad} alt="Emojy sad" />

                  <h2>Sem resultados</h2>
                  <h2>Tente uma nova busca</h2>
                </ContainerCitiesError>
              )}
            </ContainerCities>
          </ContainerContent>

          {modalRemoveCity.toggle && (
            <ModalRemove
              city={modalRemoveCity.city}
              handleToggle={handleToggleModalRemoveCity}
            />
          )}
        </Container>
      )}
    </>
  );
};

export default Citites;
