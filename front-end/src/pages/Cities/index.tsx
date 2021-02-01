import React from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Main/Header";
import { useCities } from "../../hooks/CitiesManager";
import EmojySad from "../../assets/cities/emoji_sad.png";

import {
  Container,
  ContainerContent,
  HeaderContainer,
  HeaderFilter,
  ContainerCities,
  ContentCities,
  ContainerCitiesError,
} from "./styles";

export interface CityProps {
  id: number;
  name: string;
  image: string;
  description: string;
  opacity?: 0 | 1;
}

const Citites: React.FC = () => {
  const { cities, filterOption, filterOptions } = useCities();

  return (
    <Container>
      <Header restrict middleContent="search" />

      <ContainerContent>
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
              className={filterOption === 3 ? "focus focus-div-arrow " : ""}
              onClick={() => filterOptions(3)}
            >
              {filterOption === 3 ? "Z-A" : "A-Z"}
            </div>
          </HeaderFilter>
        </HeaderContainer>

        <ContainerCities>
          {cities ? (
            cities.map((city, i) => (
              <Link
                to={{
                  pathname: `/city/${city.name}`,
                  state: {
                    cityInformation: city,
                  },
                }}
                style={{
                  textDecoration: "none",
                  flexBasis: 0,
                  flexGrow: 1,
                  maxWidth: "100%",
                  position: "relative",
                  width: "100%",
                  paddingRight: 26,
                  paddingLeft: 0,
                  display: "flex",
                  justifyContent: "center",
                  opacity:
                    city.opacity !== undefined ? (!city.opacity ? 0.6 : 1) : 1,
                }}
                key={city.id}
              >
                <ContentCities>
                  <img src={city.image} alt={city.name} />

                  <div>
                    <h3>{city.name}</h3>
                    <span>13 locais</span>
                  </div>
                </ContentCities>
              </Link>
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
    </Container>
  );
};

export default Citites;
