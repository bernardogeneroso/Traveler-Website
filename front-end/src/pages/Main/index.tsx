import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Main/Header";
import api from "../../services/api";
import { CityProps } from "../Cities";

import {
  Container,
  ContainerContent,
  LeftPanel,
  RightPanel,
  ContainerCities,
  ContentCity,
} from "./styles";

const Main = () => {
  const [citites, setCitites] = useState<CityProps[]>([]);

  useEffect(() => {
    api.get("/cities").then((response) => {
      setCitites(response.data);
    });
  }, []);

  return (
    <Container>
      <Header restrict />

      <ContainerContent>
        <LeftPanel>
          <h1>Viva uma grande aventura</h1>

          <p>
            Descobre os locais incríveis para visitares em cidades maravilhosas.
          </p>

          <Link to="cities">
            <button>Descobrir todos os lugares</button>
          </Link>
        </LeftPanel>

        <RightPanel>
          <ContainerCities>
            {citites.map((city, i) => (
              <ContentCity
                key={city.id}
                secondColumn={i === 1 ? true : false}
                firstColumn={i !== 0 && i % 2 === 0 ? true : false}
              >
                <img
                  src={`${process.env.REACT_APP_API_URL}/cities/image/${city.image}`}
                  alt={city.name}
                />

                <div>
                  <h3>{city.name}</h3>
                  <span>{city.locals} locais</span>
                </div>
              </ContentCity>
            ))}
          </ContainerCities>
        </RightPanel>
      </ContainerContent>
    </Container>
  );
};

export default Main;
