import React, { useState, useEffect, useCallback, useMemo } from "react";
import { StaticContext } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillStar, AiOutlineStar, AiOutlineClose } from "react-icons/ai";
import { getDay, getDate, getYear, getMonth, addWeeks } from "date-fns";
import { MapContainer, TileLayer } from "react-leaflet";

import Header from "../../components/Main/Header";
import { PlaceProps } from "../City";
import { CityProps } from "../Cities";
import api from "../../services/api";

import {
  Container,
  ContainerPlaceInformation,
  StructurePlaceInformation,
  PlaceBackground,
  ContainerStructurePlaceInformation,
  ContentPlaceInformation,
  ContainerShecdulesPlace,
  StructureShecdulesPlace,
  ContentShecdulesPlace,
  ContainerNextEditionEvent,
  ContainerPlaceContact,
  ContainerPlaceMaps,
  ContainerStructurePlaceMaps,
  ContentPlaceMaps,
  ContentPlaceAddress,
  ContainerPlaceRating,
  ContentStructurePlaceRating,
  ContainerPlaceRatingComments,
  ContentPlaceRatingComment,
  PlaceRatingCommentLeftImage,
  PlaceRatingCommentInformation,
  PlaceRatingCommentHeader,
  PlaceRatingCommentContent,
  ContainerModalAddEvaluation,
  HeaderModalAddEvaluation,
  BodyModalAddEvaluation,
  DialogModalAddEvaluation,
  ContentModalAddEvaluation,
  ContainerRatingAddEvaluation,
  ContentRatingAddEvaluation,
  FirstLineModalAddEvaluation,
  SecondLineModalAddEvaluation,
  ThirdLineModalAddEvaluation,
} from "./styles";

type LocationState = {
  placeInformation: PlaceProps;
  cityInformation: CityProps;
};

interface EvaluationsProps {
  id: number;
  place_id: number;
  name: string;
  avatar: string;
  description: string;
  rating: number;
}

const Place = (
  props: RouteComponentProps<{}, StaticContext, LocationState>
) => {
  const [place] = useState(props.location.state.placeInformation);
  const [evaluations, setEvaluations] = useState<
    EvaluationsProps[] | undefined
  >(undefined);
  const [modalAddEvaluation, setModalAddEvaluation] = useState<boolean>(true);
  const [scheduleChoice] = useState<number>(() => {
    const dateNow = new Date();
    const dayOfWeek = getDay(dateNow);

    return dayOfWeek + 1;
  });

  useEffect(() => {
    api.get(`/evaluations/${place.id}`).then((response) => {
      setEvaluations(response.data);
    });
  }, [place.id]);

  const handleToggleModalAddEvaluation = useCallback(() => {
    setModalAddEvaluation((state) => !state);
  }, []);

  const handleEventNextEdition = useMemo(() => {
    const dateNow = new Date();
    const oneMoreWeek = addWeeks(dateNow, 1);
    const day = getDate(oneMoreWeek);
    const month = getMonth(oneMoreWeek);
    const year = getYear(oneMoreWeek);
    let monthName = "";

    switch (month) {
      case 0:
        monthName = "janeiro";
        break;
      case 1:
        monthName = "fevereiro";
        break;
      case 2:
        monthName = "março";
        break;
      case 3:
        monthName = "abril";
        break;
      case 4:
        monthName = "maio";
        break;
      case 5:
        monthName = "junho";
        break;
      case 6:
        monthName = "julho";
        break;
      case 7:
        monthName = "agosto";
        break;
      case 8:
        monthName = "setembro";
        break;
      case 9:
        monthName = "outubro";
        break;
      case 10:
        monthName = "novembro";
        break;
      case 11:
        monthName = "dezembro";
        break;
    }

    return `Dias ${day}, ${day + 1} e ${day + 2} de ${monthName} de ${year}`;
  }, []);

  const handleEvaluationAverage = useMemo(() => {
    if (!evaluations) return;
    const evaluationRating = evaluations.map((evaluation: EvaluationsProps) => {
      return evaluation.rating;
    }, []);

    const avgerageRating =
      evaluationRating.reduce((a, b) => a + b, 0) / evaluationRating.length;

    const arround = (Math.round(avgerageRating * 10) / 10)
      .toString()
      .split(".");

    return !arround[1]
      ? `${arround[0]},0`
      : parseInt(arround[1]) > 0 && parseInt(arround[1]) < 5
      ? `${arround[0]},5`
      : `${parseInt(arround[0]) + 1},0`;
  }, [evaluations]);

  return (
    <Container overflowHidden={modalAddEvaluation ? true : false}>
      <ContainerPlaceInformation filterBlur={modalAddEvaluation ? true : false}>
        <StructurePlaceInformation>
          <Header
            lastPage={`city/${props.location.state.cityInformation.name}`}
            cityInformation={props.location.state.cityInformation}
          />

          <ContainerStructurePlaceInformation>
            <ContentPlaceInformation>
              <h1>{place.name}</h1>

              <p>{place.description}</p>

              {place.category === 1 ? (
                <>
                  <StructureShecdulesPlace>
                    <h2>Atendimento</h2>
                    <hr />
                    <ContainerShecdulesPlace>
                      <ContentShecdulesPlace
                        className={scheduleChoice === 1 ? "focus" : ""}
                      >
                        <span>Domingo</span>
                        <div>Fechado</div>
                      </ContentShecdulesPlace>
                      <ContentShecdulesPlace
                        className={scheduleChoice === 2 ? "focus" : ""}
                      >
                        <span>Segunda</span>
                        <div>8h - 19h</div>
                      </ContentShecdulesPlace>
                      <ContentShecdulesPlace
                        className={scheduleChoice === 3 ? "focus" : ""}
                      >
                        <span>Terça</span>
                        <div>8h - 19h</div>
                      </ContentShecdulesPlace>
                      <ContentShecdulesPlace
                        className={scheduleChoice === 4 ? "focus" : ""}
                      >
                        <span>Quarta</span>
                        <div>8h - 19h</div>
                      </ContentShecdulesPlace>
                      <ContentShecdulesPlace
                        className={scheduleChoice === 5 ? "focus" : ""}
                      >
                        <span>Quinta</span>
                        <div>8h - 19h</div>
                      </ContentShecdulesPlace>
                      <ContentShecdulesPlace
                        className={scheduleChoice === 6 ? "focus" : ""}
                      >
                        <span>Sexta</span>
                        <div>8h - 19h</div>
                      </ContentShecdulesPlace>
                      <ContentShecdulesPlace
                        className={scheduleChoice === 7 ? "focus" : ""}
                      >
                        <span>Sábado</span>
                        <div>8h - 17h</div>
                      </ContentShecdulesPlace>
                    </ContainerShecdulesPlace>
                  </StructureShecdulesPlace>

                  <ContainerPlaceContact>
                    <button>
                      <IoLogoWhatsapp
                        size={22}
                        color="#438846"
                        style={{ zIndex: 9 }}
                      />
                      Entrar em contacto<div></div>
                    </button>

                    <div>
                      Telefone
                      <span>{place.phone_number}</span>
                    </div>
                  </ContainerPlaceContact>
                </>
              ) : (
                place.category === 3 && (
                  <ContainerNextEditionEvent>
                    <span>Próxima edição em</span>
                    <span>{handleEventNextEdition}</span>
                  </ContainerNextEditionEvent>
                )
              )}

              <ContainerPlaceMaps>
                <ContainerStructurePlaceMaps>
                  <h2>Endereço</h2>

                  <a
                    href="https://www.google.com/maps/place/37.1362+-8.5377"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>Ver no Google Maps</span>
                  </a>
                </ContainerStructurePlaceMaps>
                <hr />

                <ContentPlaceMaps>
                  <div>
                    <MapContainer
                      center={[37.1362, -8.5377]}
                      zoom={14}
                      scrollWheelZoom={false}
                      style={{ height: 180, borderRadius: 10 }}
                      maxZoom={18}
                    >
                      <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                    </MapContainer>
                  </div>
                </ContentPlaceMaps>

                <ContentPlaceAddress>{place.address}</ContentPlaceAddress>
              </ContainerPlaceMaps>

              {evaluations && (
                <ContainerPlaceRating>
                  <ContentStructurePlaceRating>
                    <div>
                      <h2>Avaliações</h2>

                      <div>
                        <AiFillStar size={22} color="#F25D27" />
                        <span>{handleEvaluationAverage}</span>
                      </div>
                    </div>

                    <div>
                      <span onClick={handleToggleModalAddEvaluation}>
                        Adicionar
                      </span>
                      <span>Ver todas</span>
                    </div>
                  </ContentStructurePlaceRating>
                  <hr />

                  <ContainerPlaceRatingComments>
                    {evaluations.map((evaluation: EvaluationsProps) => (
                      <ContentPlaceRatingComment key={evaluation.id}>
                        <PlaceRatingCommentLeftImage>
                          <img src={evaluation.avatar} alt={evaluation.name} />
                        </PlaceRatingCommentLeftImage>
                        <PlaceRatingCommentInformation>
                          <PlaceRatingCommentHeader>
                            <div>{evaluation.name}</div>

                            <div>
                              {[1, 2, 3, 4, 5].map((value: number) => {
                                return evaluation.rating >= value ? (
                                  <span key={value}>
                                    <AiFillStar size={22} color="#F25D27" />
                                  </span>
                                ) : (
                                  <span key={value}>
                                    <AiOutlineStar size={22} color="#F25D27" />
                                  </span>
                                );
                              })}
                            </div>
                          </PlaceRatingCommentHeader>
                          <PlaceRatingCommentContent>
                            Grande variedade de bolos, cucas, tortas e algumas
                            opções de salgados.
                          </PlaceRatingCommentContent>
                        </PlaceRatingCommentInformation>
                      </ContentPlaceRatingComment>
                    ))}
                  </ContainerPlaceRatingComments>
                </ContainerPlaceRating>
              )}
            </ContentPlaceInformation>
          </ContainerStructurePlaceInformation>
        </StructurePlaceInformation>

        <PlaceBackground image={place.image} />
      </ContainerPlaceInformation>

      {modalAddEvaluation && (
        <ContainerModalAddEvaluation>
          <DialogModalAddEvaluation>
            <ContentModalAddEvaluation>
              <HeaderModalAddEvaluation>
                <h2>Adicionar avaliação</h2>

                <div onClick={handleToggleModalAddEvaluation}>
                  <AiOutlineClose size={22} color="#A0ACB2" />
                </div>
              </HeaderModalAddEvaluation>
              <BodyModalAddEvaluation>
                <form>
                  <FirstLineModalAddEvaluation>
                    <div>
                      <label htmlFor="file-upload">Upload da sua foto</label>
                      <input id="file-upload" type="file" />
                    </div>

                    <div>
                      <input
                        name="name"
                        type="text"
                        placeholder="Seu nome completo"
                      />
                    </div>
                  </FirstLineModalAddEvaluation>

                  <SecondLineModalAddEvaluation>
                    <textarea
                      name="description"
                      placeholder="Escreva aqui..."
                      rows={6}
                    ></textarea>
                    <span>Máximo 240 caracteres</span>
                  </SecondLineModalAddEvaluation>

                  <ThirdLineModalAddEvaluation>
                    <span>Sua nota de 1 a 5</span>

                    <ContainerRatingAddEvaluation>
                      {[1, 2, 3, 4, 5].map((value: number) => (
                        <ContentRatingAddEvaluation
                          firstItem={value === 1 ? true : false}
                          lastItem={value === 5 ? true : false}
                        >
                          <AiOutlineStar
                            size={22}
                            color="#A0ACB2"
                            key={value}
                          />
                        </ContentRatingAddEvaluation>
                      ))}
                    </ContainerRatingAddEvaluation>
                  </ThirdLineModalAddEvaluation>
                </form>
              </BodyModalAddEvaluation>
            </ContentModalAddEvaluation>
          </DialogModalAddEvaluation>
        </ContainerModalAddEvaluation>
      )}
    </Container>
  );
};

export default Place;