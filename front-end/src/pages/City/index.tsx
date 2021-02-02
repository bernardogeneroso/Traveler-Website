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
  ContainerPlacesFilter,
  ContentPlacesFilter,
  PlacesFilter,
  ContainerAllPlaces,
  ContentAllPlaces,
} from "./styles";

type LocationState = {
  cityInformation: CityProps;
};

export interface PlaceProps {
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
  const [filterOption, setFilterOption] = useState<number>(1);
  const [places, setPlaces] = useState<PlaceProps[]>([]);
  const [placesFilter, setPlacesFiler] = useState<PlaceProps[]>([]);

  useEffect(() => {
    api
      .get(`/places`, {
        params: {
          id: city.id,
        },
      })
      .then((response) => {
        setPlaces(response.data);
      });
  }, [city]);

  useEffect(() => {
    api.get(`/places`).then((response) => {
      setPlacesFiler(response.data);
    });
  }, []);

  const handleFilterOptions = useCallback(
    async (option: number) => {
      if (option === filterOption) return;
      setFilterOption(option);

      if (option === 1) {
        const { data } = await api.get(`/places`);
        setPlacesFiler(data);
        return;
      }

      const { data } = await api.get(`/places`, {
        params: {
          category: option - 1,
        },
      });
      setPlacesFiler(data);
    },
    [filterOption]
  );

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
              {places.map((place: PlaceProps) => (
                <Link
                  to={{
                    pathname: `/place/${place.name}`,
                    state: {
                      placeInformation: place,
                      cityInformation: city,
                    },
                  }}
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

        {placesFilter && (
          <ContainerPlacesFilter>
            <ContentPlacesFilter>
              <h2>Conheça todos</h2>

              <PlacesFilter>
                <div
                  className={filterOption === 1 ? "focus" : ""}
                  onClick={() => handleFilterOptions(1)}
                >
                  Todas
                </div>
                <div
                  className={filterOption === 2 ? "focus" : ""}
                  onClick={() => handleFilterOptions(2)}
                >
                  Comida & Bebida
                </div>
                <div
                  className={filterOption === 3 ? "focus" : ""}
                  onClick={() => handleFilterOptions(3)}
                >
                  Pontos Turísticos
                </div>
                <div
                  className={filterOption === 4 ? "focus" : ""}
                  onClick={() => handleFilterOptions(4)}
                >
                  Eventos Organizados
                </div>
              </PlacesFilter>
            </ContentPlacesFilter>

            <ContainerAllPlaces>
              {placesFilter.map((place: PlaceProps) => (
                <Link
                  to={{
                    pathname: `/place/${place.name}`,
                    state: {
                      cityInformation: city,
                      placeInformation: place,
                    },
                  }}
                  style={{
                    textDecoration: "none",
                  }}
                  key={place.id}
                >
                  <ContentAllPlaces>
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
                  </ContentAllPlaces>
                </Link>
              ))}
            </ContainerAllPlaces>
          </ContainerPlacesFilter>
        )}
      </ContainerContent>
    </Container>
  );
};

export default City;
