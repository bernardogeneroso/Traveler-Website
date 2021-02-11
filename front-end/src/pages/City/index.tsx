import React, { useState, useEffect, useCallback } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  FiCamera,
  FiCoffee,
  FiCalendar,
  FiInfo,
  FiEdit3,
  FiTrash,
} from "react-icons/fi";

import { AiFillStar } from "react-icons/ai";

import Header from "../../components/Main/Header";
import HeaderAdmin from "../../components/Main/HeaderAdmin";
import MenuAdmin from "../../components/Main/MenuAdmin";
import { CityProps } from "../Cities";
import api from "../../services/api";
import { useAuth } from "../../hooks/Auth";

import englishBeach from "../../assets/city/praia_dos_ingleses.jpg";

import {
  ContainerLoading,
  DialogLoading,
  Loadbar,
  Spinner,
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
  ContainerOptionsPlace,
} from "./styles";

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

interface ParamsProps {
  id: string;
}

const City: React.FC = () => {
  const { user } = useAuth();
  const params = useParams<ParamsProps>();
  const history = useHistory();

  const [city, setCity] = useState<CityProps>({} as CityProps);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterOption, setFilterOption] = useState<number>(1);
  const [places, setPlaces] = useState<PlaceProps[]>([]);
  const [placesFilter, setPlacesFiler] = useState<PlaceProps[]>([]);

  useEffect(() => {
    const { id } = params;

    api
      .get(`/cities/${id}`)
      .then((response) => {
        setCity(response.data);
        setLoading(false);
      })
      .catch(() => {
        history.push("/cities");
      });
  }, [history, params]);

  useEffect(() => {
    api
      .get(`/places`, {
        params: {
          id: city.id,
          limit: 4,
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
          {!!user ? (
            <>
              <MenuAdmin key="menuAdmin" />
              <HeaderAdmin
                city={city}
                lastPage="cities"
                buttonPosition="city"
              />
            </>
          ) : (
            <Header restrict lastPage="cities" middleContent="city" />
          )}

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
                  populares como a Praia dos Ingleses na extremidade norte da
                  ilha.
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
                    <ContentTopRating key={place.id}>
                      <img src={place.image} alt={place.name} />

                      <Link
                        to={`/place/${place.id}`}
                        style={{
                          textDecoration: "none",
                        }}
                        className="informations"
                      >
                        <h3>{place.name}</h3>

                        {place.category === 1 ? (
                          <div className="category">
                            Comida e Bebida
                            <FiCoffee size={20} color="#F25D27" />
                          </div>
                        ) : place.category === 2 ? (
                          <div className="category">
                            Pontos Turísticos
                            <FiCamera size={20} color="#F25D27" />
                          </div>
                        ) : (
                          <div className="category">
                            Eventos Organizados
                            <FiCalendar size={20} color="#F25D27" />
                          </div>
                        )}
                        <Rating>
                          <AiFillStar size={26} color="#fff" />
                          {place.rating}
                        </Rating>
                      </Link>

                      {!!user && (
                        <ContainerOptionsPlace>
                          <div>
                            <FiEdit3 size={20} color="#617480" />
                          </div>
                          <div>
                            <FiTrash size={20} color="#617480" />
                          </div>
                        </ContainerOptionsPlace>
                      )}
                    </ContentTopRating>
                  ))}
                </ContainerTops>

                <Link
                  to={`/cities`}
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
                        <h2>Praia dos Ingleses</h2>

                        <p>
                          Uma parte do paraíso na terra. Frequentemente com
                          águas claras em tons verdes e azuis. Um dos locais
                          mais preferidos por turistas e viajantes.
                        </p>
                      </div>
                    </ContentHighlight>
                    <ContentHighlightImage>
                      <img src={englishBeach} alt="Praia dos Ingleses" />
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
                    <ContentTopRating key={place.id} className="allPlaces">
                      <img src={place.image} alt={place.name} />

                      <Link
                        to={`/place/${place.id}`}
                        style={{
                          textDecoration: "none",
                        }}
                        className="informations"
                      >
                        <h3>{place.name}</h3>

                        {place.category === 1 ? (
                          <div className="category">
                            Comida e Bebida
                            <FiCoffee size={20} color="#F25D27" />
                          </div>
                        ) : place.category === 2 ? (
                          <div className="category">
                            Pontos Turísticos
                            <FiCamera size={20} color="#F25D27" />
                          </div>
                        ) : (
                          <div className="category">
                            Eventos Organizados
                            <FiCalendar size={20} color="#F25D27" />
                          </div>
                        )}
                        <Rating>
                          <AiFillStar size={26} color="#fff" />
                          {place.rating}
                        </Rating>
                      </Link>

                      {!!user && (
                        <ContainerOptionsPlace>
                          <div>
                            <FiEdit3 size={20} color="#617480" />
                          </div>
                          <div>
                            <FiTrash size={20} color="#617480" />
                          </div>
                        </ContainerOptionsPlace>
                      )}
                    </ContentTopRating>
                  ))}
                </ContainerAllPlaces>
              </ContainerPlacesFilter>
            )}
          </ContainerContent>
        </Container>
      )}
    </>
  );
};

export default City;
