import React, { useState, useEffect, useCallback } from "react";
import { StaticContext } from "react-router";
import { Link, RouteComponentProps } from "react-router-dom";
import { FiCamera, FiCoffee, FiCalendar, FiInfo } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";

import Header from "../../components/Main/Header";
import { CityProps } from "../Cities";
import api from "../../services/api";

import englishBeach from "../../assets/city/praia_dos_ingleses.png";

import {
  Container,
  ContainerBackground,
  Background,
  ContainerContent,
  ContainerCityInformation,
  AboutCityInformation,
  PlacesCityInformation,
  ContainerPlace,
  ContainerTopRating,
  ContainerTops,
  ContentTopRating,
  Rating,
  ContainerHighlight,
  ContentHighlight,
  ContentHighlightImage,
} from "./styles";

type LocationState = {
  cityInformation: CityProps;
};

interface PlacesProps {
  id: number;
  city_id: number;
  name: string;
  image: string;
  description: string;
  phone_number: string;
  address: string;
  category: number;
  rating: number;
}

const City = (props: RouteComponentProps<{}, StaticContext, LocationState>) => {
  const [city] = useState(props.location.state.cityInformation);
  const [places, setPlaces] = useState<PlacesProps[]>([]);

  useEffect(() => {
    api.get(`/places/${city.id}`).then((response) => {
      setPlaces(response.data);
    });
  }, [city]);

  return (
    <Container>
      <Header restrict lastPage="cities" middleContent="city" />
      <ContainerBackground>
        <Background image={city.image} />
      </ContainerBackground>

      <ContainerContent>
        <ContainerCityInformation>
          <AboutCityInformation>
            <h1>{city.name}</h1>

            <p>{city.description}</p>

            <span>
              É famosa pelas suas praias, incluindo estâncias turísticas
              populares como a Praia dos Ingleses na extremidade norte da ilha.
            </span>
          </AboutCityInformation>
          <PlacesCityInformation>
            <ContainerPlace>
              <div>
                <FiCamera size={36} color="#F25D27" />
              </div>

              <div>
                <h1>67</h1>

                <span>Pontos Turísticos</span>
              </div>
            </ContainerPlace>
            <ContainerPlace>
              <div>
                <FiCoffee size={36} color="#F25D27" />
              </div>

              <div>
                <h1>20</h1>

                <span>Comida e Bebida</span>
              </div>
            </ContainerPlace>
            <ContainerPlace>
              <div>
                <FiCalendar size={36} color="#F25D27" />
              </div>

              <div>
                <h1>11</h1>

                <span>Eventos Organizados</span>
              </div>
            </ContainerPlace>
          </PlacesCityInformation>
        </ContainerCityInformation>

        {Object.keys(places).length !== 0 && (
          <ContainerTopRating>
            <h2>Top avaliados</h2>
            <ContainerTops>
              {places.map((place: PlacesProps) => (
                <Link
                  to={`/place/${place.name}`}
                  style={{
                    textDecoration: "none",
                  }}
                  key={place.id}
                >
                  <ContentTopRating>
                    <img src={place.image} alt={place.name} />

                    <h3>{place.name}</h3>

                    {place.category === 1 ? (
                      <div>
                        Comida e Bebida <FiCoffee size={20} color="#F25D27" />{" "}
                      </div>
                    ) : place.category === 2 ? (
                      <div>
                        Pontos Turísticos <FiCamera size={20} color="#F25D27" />
                      </div>
                    ) : (
                      <div>
                        Eventos Organizados
                        <FiCalendar size={20} color="#F25D27" />
                      </div>
                    )}
                    <Rating>
                      <AiFillStar size={26} color="#fff" />
                      {place.rating}
                    </Rating>
                  </ContentTopRating>
                </Link>
              ))}
            </ContainerTops>

            <Link
              to={`/place/`}
              style={{
                textDecoration: "none",
              }}
            >
              <ContainerHighlight>
                <ContentHighlight>
                  <div>
                    <FiInfo size={26} color="#fff" />
                    Destaques
                  </div>

                  <div>
                    <h2>Praia dos Inglesses</h2>

                    <p>
                      Uma parte do paraíso na terra. Frequentemente com águas
                      claras em tons verdes e azuis. Um dos locais mais
                      preferidos por turistas e viajantes.
                    </p>
                  </div>
                </ContentHighlight>
                <ContentHighlightImage>
                  <img src={englishBeach} alt="Praia dos Inglesses" />
                </ContentHighlightImage>
              </ContainerHighlight>
            </Link>
          </ContainerTopRating>
        )}
      </ContainerContent>
    </Container>
  );
};

export default City;
