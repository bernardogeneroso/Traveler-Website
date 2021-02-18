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
import ModalRemove, {
  ModalRemoceProperties,
} from "../../components/Main/ModalRemove";
import Icon from "../../components/Icon";
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
  place_name: string;
  image: string;
  description: string;
  phone_number: string | null;
  address: string;
  rating: string;
  iconName: string;
  categorie_name: string;
  city_id: string;
  categorie_id: string;
  created_at: string;
  updated_at: string;
}

export interface CategoriesProps {
  id: string;
  name: string | undefined;
  iconName: string | undefined;
  created_at: string | undefined;
  updated_at: string | undefined;
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
  const [filterOption, setFilterOption] = useState<string>("all");
  const [places, setPlaces] = useState<PlaceProps[]>([]);
  const [placesFilter, setPlacesFiler] = useState<PlaceProps[]>([]);
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [
    modalRemovePlace,
    setModalRemovePlace,
  ] = useState<ModalRemoceProperties>({
    toggle: false,
  });

  useEffect(() => {
    const { id } = params;

    api
      .get(`/cities/${id}`)
      .then(({ data }) => {
        const city = {
          ...data,
          image: `${process.env.REACT_APP_API_URL}/cities/image/${data.image}`,
        };

        setCity(city);
        setLoading(false);
      })
      .catch(() => {
        history.goBack();
      });
  }, [history, params]);

  useEffect(() => {
    if (city.id) {
      api.get(`/places/?limit=4&city_id=${city.id}`).then((response) => {
        setPlaces(response.data);
      });
    }
  }, [city]);

  useEffect(() => {
    api.get("/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  useEffect(() => {
    api.get(`/places`).then((response) => {
      setPlacesFiler(response.data);
    });
  }, []);

  const handleFilterOptions = useCallback(
    async (option: string) => {
      if (option === filterOption) return;
      setFilterOption(option);

      if (option === "all") {
        const { data } = await api.get(`/places`);
        setPlacesFiler(data);
        return;
      }

      const { data } = await api.get(`/places`, {
        params: {
          categorie_id: option,
        },
      });

      setPlacesFiler(data);
    },
    [filterOption]
  );

  const handleSetModalRemovePlaceID = useCallback((place: PlaceProps) => {
    setModalRemovePlace({
      toggle: true,
      place,
    });
  }, []);

  const handleToggleModalRemovePlace = useCallback(() => {
    setModalRemovePlace((state) => ({
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
                      <img
                        src={`${process.env.REACT_APP_API_URL}/places/image/${place.image}`}
                        alt={place.place_name}
                      />

                      <Link
                        to={`/place/${place.id}`}
                        style={{
                          textDecoration: "none",
                        }}
                        className="informations"
                      >
                        <h3>{place.place_name}</h3>

                        <div className="category">
                          {place.categorie_name}
                          <Icon
                            iconName={place.iconName}
                            size={20}
                            color="#F25D27"
                          />
                        </div>

                        <Rating>
                          <AiFillStar size={26} color="#fff" />
                          {place.rating}
                        </Rating>
                      </Link>

                      {!!user && (
                        <ContainerOptionsPlace>
                          <Link to={`/place/edit/${place.id}`}>
                            <div>
                              <FiEdit3 size={20} color="#617480" />
                            </div>
                          </Link>
                          <div
                            onClick={() => handleSetModalRemovePlaceID(place)}
                          >
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
                      className={filterOption === "all" ? "focus" : ""}
                      onClick={() => handleFilterOptions("all")}
                    >
                      Todas
                    </div>
                    {categories.map((categorie: CategoriesProps, i) => (
                      <div
                        className={filterOption === categorie.id ? "focus" : ""}
                        onClick={() => handleFilterOptions(categorie.id)}
                      >
                        {categorie.name}
                      </div>
                    ))}
                  </PlacesFilter>
                </ContentPlacesFilter>

                <ContainerAllPlaces>
                  {placesFilter.map((place: PlaceProps) => (
                    <ContentTopRating key={place.id} className="allPlaces">
                      <img
                        src={`${process.env.REACT_APP_API_URL}/places/image/${place.image}`}
                        alt={place.place_name}
                      />

                      <Link
                        to={`/place/${place.id}`}
                        style={{
                          textDecoration: "none",
                        }}
                        className="informations"
                      >
                        <h3>{place.place_name}</h3>

                        <div className="category">
                          {place.categorie_name}
                          <Icon
                            iconName={place.iconName}
                            size={20}
                            color="#F25D27"
                          />
                        </div>

                        <Rating>
                          <AiFillStar size={26} color="#fff" />
                          {place.rating}
                        </Rating>
                      </Link>

                      {!!user && (
                        <ContainerOptionsPlace>
                          <Link to={`/place/edit/${place.id}`}>
                            <div>
                              <FiEdit3 size={20} color="#617480" />
                            </div>
                          </Link>
                          <div
                            onClick={() => handleSetModalRemovePlaceID(place)}
                          >
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

          {modalRemovePlace.toggle && (
            <ModalRemove
              place={modalRemovePlace.place}
              handleToggle={handleToggleModalRemovePlace}
              redirect
            />
          )}
        </Container>
      )}
    </>
  );
};

export default City;
