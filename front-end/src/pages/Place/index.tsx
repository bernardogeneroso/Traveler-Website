import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  FiCamera,
  FiCalendar,
  FiCoffee,
  FiMessageSquare,
} from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io";
import { CgSpinnerTwo } from "react-icons/cg";
import { AiFillStar, AiOutlineStar, AiOutlineClose } from "react-icons/ai";
import { getDay, getDate, getYear, getMonth, addWeeks } from "date-fns";
import { MapContainer, TileLayer } from "react-leaflet";

import Header from "../../components/Main/Header";
import HeaderAdmin from "../../components/Main/HeaderAdmin";
import MenuAdmin from "../../components/Main/MenuAdmin";
import { PlaceProps } from "../City";
import api from "../../services/api";
import { useAuth } from "../../hooks/Auth";

import emojiSmile from "../../assets/places/emoji_smile.png";

import {
  ContainerLoading,
  DialogLoading,
  Loadbar,
  Spinner,
  Container,
  ContainerPlaceInformation,
  StructurePlaceInformation,
  PlaceIcon,
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
  FooterFormModalAddEvaluation,
  ContainerModalSeeEvaluation,
  DialogModalSeeEvaluation,
  ContentModalSeeEvaluation,
  ContainerNotificationSendEvaluation,
  DialogModalNotificationSendEvaluation,
  ContentNotificationSendEvaluation,
  HeaderModalSeeEvaluation,
  ContainerPlaceRatingCommentsModalSeeEvaluation,
  BodyModalSeeEvaluation,
} from "./styles";
import { FiInfo } from "react-icons/fi";

interface EvaluationsProps {
  id: number;
  place_id: number;
  name: string;
  avatar: string;
  description: string;
  rating: number;
}

interface FormModalAddEvaluationProps {
  image?: File;
  name: string;
  description: string;
  evaluation: number;
}

interface ParamsProps {
  id: string;
}

const Place = () => {
  const { user } = useAuth();
  const params = useParams<ParamsProps>();
  const history = useHistory();

  const [place, setPlace] = useState({} as PlaceProps);
  const [loading, setLoading] = useState<boolean>(true);
  const [evaluations, setEvaluations] = useState<EvaluationsProps[]>([]);
  const [modalAddEvaluation, setModalAddEvaluation] = useState<boolean>(false);
  const [modalSeeEvaluation, setModalSeeEvaluation] = useState<boolean>(false);
  const [
    notificationSendEvaluation,
    setNotificationSendEvaluation,
  ] = useState<boolean>(false);
  const [
    formModalAddEvaluation,
    setFormModalAddEvaluation,
  ] = useState<FormModalAddEvaluationProps>({
    name: "",
    description: "",
    evaluation: 0,
  });
  const [scheduleChoice] = useState<number>(() => {
    const dateNow = new Date();
    const dayOfWeek = getDay(dateNow);

    return dayOfWeek + 1;
  });

  useEffect(() => {
    const { id } = params;

    api
      .get(`/places/${id}`)
      .then((response) => {
        setPlace(response.data);
        setLoading(false);
      })
      .catch(() => {
        history.push("/cities");
      });
  }, [params, history]);

  useEffect(() => {
    if (place.id) {
      api.get(`/evaluations/${place.id}`).then((response) => {
        setEvaluations(response.data);
      });
    }
  }, [place.id]);

  const handleToggleModalAddEvaluation = useCallback(() => {
    setModalAddEvaluation((state) => {
      if (state) {
        setFormModalAddEvaluation({
          name: "",
          description: "",
          evaluation: 0,
        });
      }

      return !state;
    });
  }, []);

  const handleToggleNotificationSendEvaluation = useCallback(() => {
    setNotificationSendEvaluation((state) => !state);
  }, []);

  const handleToggleModalSeeEvaluation = useCallback(() => {
    setModalSeeEvaluation((state) => !state);
  }, []);

  const handleFormModalAddEvaluation = useCallback(
    (value: number, event: any) => {
      if (value === 1) {
        const name = event.target.value;

        setFormModalAddEvaluation((state) => ({
          ...state,
          name,
        }));
      } else if (value === 2) {
        const description = event.target.value;

        setFormModalAddEvaluation((state) => ({
          ...state,
          description,
        }));
      } else if (value === 3) {
        const file = event.target.files[0];

        setFormModalAddEvaluation((state) => ({
          ...state,
          image: file,
        }));
      }
    },
    []
  );

  const handleEvalutionModalAdd = useCallback((value: number) => {
    setFormModalAddEvaluation((state) => ({
      ...state,
      evaluation: value,
    }));
  }, []);

  const handleSubmitModalAddEvaluation = useCallback(
    async (event) => {
      event.preventDefault();

      const file = formModalAddEvaluation.image;
      const name = formModalAddEvaluation.name;
      const description = formModalAddEvaluation.description;
      const evaluation = formModalAddEvaluation.evaluation;

      if (
        !file ||
        !name ||
        !description ||
        !evaluation ||
        description.length > 240
      )
        return;

      const place_id = place.id;

      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("place_id", place_id.toString());
      formData.append("name", name);
      formData.append("description", description);
      formData.append("rating", evaluation.toString());

      await api.post("/evaluations/create", formData);

      handleToggleModalAddEvaluation();
      handleToggleNotificationSendEvaluation();
    },
    [
      formModalAddEvaluation,
      place.id,
      handleToggleModalAddEvaluation,
      handleToggleNotificationSendEvaluation,
    ]
  );

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
        <Container
          overflowHidden={
            modalAddEvaluation ||
            notificationSendEvaluation ||
            modalSeeEvaluation
              ? true
              : false
          }
        >
          <ContainerPlaceInformation
            filterBlur={
              modalAddEvaluation ||
              notificationSendEvaluation ||
              modalSeeEvaluation
                ? true
                : false
            }
          >
            <StructurePlaceInformation>
              {!!user ? (
                <>
                  <MenuAdmin />
                  <HeaderAdmin
                    lastPage={`city/${place.city_id}`}
                    placeId={place.id}
                  />
                </>
              ) : (
                <Header lastPage={`city/${place.city_id}`} />
              )}

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

                  {Object.keys(evaluations).length !== 0 && (
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
                          <span onClick={handleToggleModalSeeEvaluation}>
                            Ver todas
                          </span>
                        </div>
                      </ContentStructurePlaceRating>
                      <hr />

                      <ContainerPlaceRatingComments>
                        {evaluations.map((evaluation: EvaluationsProps) => (
                          <ContentPlaceRatingComment key={evaluation.id}>
                            <PlaceRatingCommentLeftImage>
                              <img
                                src={evaluation.avatar}
                                alt={evaluation.name}
                              />
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
                                        <AiOutlineStar
                                          size={22}
                                          color="#F25D27"
                                        />
                                      </span>
                                    );
                                  })}
                                </div>
                              </PlaceRatingCommentHeader>
                              <PlaceRatingCommentContent>
                                {evaluation.description}
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
            <PlaceIcon>
              {place.category === 1 ? (
                <FiCoffee size={26} color="#F25D27" />
              ) : place.category === 2 ? (
                <FiCamera size={26} color="#F25D27" />
              ) : (
                <FiCalendar size={26} color="#F25D27" />
              )}
            </PlaceIcon>
          </ContainerPlaceInformation>

          {modalAddEvaluation && (
            <ContainerModalAddEvaluation key="modalAddEvaluation">
              <DialogModalAddEvaluation>
                <ContentModalAddEvaluation>
                  <HeaderModalAddEvaluation>
                    <h2>Adicionar avaliação</h2>

                    <div onClick={handleToggleModalAddEvaluation}>
                      <AiOutlineClose size={22} color="#A0ACB2" />
                    </div>
                  </HeaderModalAddEvaluation>
                  <BodyModalAddEvaluation>
                    <form onSubmit={handleSubmitModalAddEvaluation}>
                      <FirstLineModalAddEvaluation
                        fileUploaded={
                          formModalAddEvaluation.image ? true : false
                        }
                      >
                        <div>
                          {!formModalAddEvaluation.image ? (
                            <label htmlFor="file-upload">
                              Upload da sua foto
                            </label>
                          ) : (
                            <label htmlFor="file-upload">
                              <span>Feito!</span>
                              <span>Trocar foto</span>
                            </label>
                          )}
                          <input
                            id="file-upload"
                            type="file"
                            onChange={(event) =>
                              handleFormModalAddEvaluation(3, event)
                            }
                          />
                        </div>

                        <div>
                          <input
                            name="name"
                            type="text"
                            placeholder="Seu nome completo"
                            onChange={(event) =>
                              handleFormModalAddEvaluation(1, event)
                            }
                            value={formModalAddEvaluation.name}
                          />
                        </div>
                      </FirstLineModalAddEvaluation>

                      <SecondLineModalAddEvaluation
                        maxCharacther={
                          formModalAddEvaluation.description.length > 240
                            ? true
                            : false
                        }
                      >
                        <textarea
                          name="description"
                          placeholder="Escreva aqui..."
                          rows={6}
                          onChange={(event) =>
                            handleFormModalAddEvaluation(2, event)
                          }
                        ></textarea>
                        <span>
                          {formModalAddEvaluation.description.length !== 0 &&
                            `(${formModalAddEvaluation.description.length})  `}
                          Máximo 240 caracteres
                        </span>
                      </SecondLineModalAddEvaluation>

                      <ThirdLineModalAddEvaluation>
                        <span>Sua nota de 1 a 5</span>

                        <ContainerRatingAddEvaluation>
                          {[1, 2, 3, 4, 5].map((value: number) => (
                            <ContentRatingAddEvaluation
                              firstItem={value === 1 ? true : false}
                              lastItem={value === 5 ? true : false}
                              checked={
                                formModalAddEvaluation.evaluation >= value
                                  ? true
                                  : false
                              }
                              onClick={() => handleEvalutionModalAdd(value)}
                            >
                              <AiOutlineStar
                                size={22}
                                color={
                                  formModalAddEvaluation.evaluation >= value
                                    ? "#F25D27"
                                    : "#A0ACB2"
                                }
                                key={value}
                              />
                            </ContentRatingAddEvaluation>
                          ))}
                        </ContainerRatingAddEvaluation>
                      </ThirdLineModalAddEvaluation>

                      <FooterFormModalAddEvaluation>
                        <div>
                          <FiInfo size={26} color="#F25D27" />

                          <span>
                            Sua avaliação será analisada para poder ser
                            publicada.
                          </span>
                        </div>

                        <button type="submit">Enviar avaliação</button>
                      </FooterFormModalAddEvaluation>
                    </form>
                  </BodyModalAddEvaluation>
                </ContentModalAddEvaluation>
              </DialogModalAddEvaluation>
            </ContainerModalAddEvaluation>
          )}

          {modalSeeEvaluation && (
            <ContainerModalSeeEvaluation key="modalSeeEvaluation">
              <DialogModalSeeEvaluation>
                <ContentModalSeeEvaluation>
                  <HeaderModalSeeEvaluation>
                    <div>
                      <span>Nota {handleEvaluationAverage}</span>

                      <span>
                        <FiMessageSquare size={22} color="#617480" />
                        {evaluations.length} comentários
                      </span>
                    </div>

                    <div>
                      <span
                        onClick={() => {
                          handleToggleModalSeeEvaluation();
                          handleToggleModalAddEvaluation();
                        }}
                      >
                        Adicionar avaliação
                      </span>

                      <span onClick={handleToggleModalSeeEvaluation}>
                        <AiOutlineClose size={22} color="#A0ACB2" />
                      </span>
                    </div>
                  </HeaderModalSeeEvaluation>
                  <BodyModalSeeEvaluation>
                    <ContainerPlaceRatingCommentsModalSeeEvaluation>
                      {evaluations.map((evaluation: EvaluationsProps) => (
                        <ContentPlaceRatingComment key={evaluation.id}>
                          <PlaceRatingCommentLeftImage>
                            <img
                              src={evaluation.avatar}
                              alt={evaluation.name}
                            />
                          </PlaceRatingCommentLeftImage>
                          <PlaceRatingCommentInformation>
                            <PlaceRatingCommentHeader>
                              <div>{evaluation.name}</div>
                            </PlaceRatingCommentHeader>
                            <PlaceRatingCommentContent>
                              {evaluation.description}

                              <div>
                                {[1, 2, 3, 4, 5].map((value: number) => {
                                  return evaluation.rating >= value ? (
                                    <span key={value}>
                                      <AiFillStar size={22} color="#F25D27" />
                                    </span>
                                  ) : (
                                    <span key={value}>
                                      <AiOutlineStar
                                        size={22}
                                        color="#F25D27"
                                      />
                                    </span>
                                  );
                                })}
                              </div>
                            </PlaceRatingCommentContent>
                          </PlaceRatingCommentInformation>
                        </ContentPlaceRatingComment>
                      ))}
                    </ContainerPlaceRatingCommentsModalSeeEvaluation>
                  </BodyModalSeeEvaluation>
                </ContentModalSeeEvaluation>
              </DialogModalSeeEvaluation>
            </ContainerModalSeeEvaluation>
          )}

          {notificationSendEvaluation && (
            <ContainerNotificationSendEvaluation key="notificationSendEvaluation">
              <DialogModalNotificationSendEvaluation>
                <ContentNotificationSendEvaluation>
                  <img src={emojiSmile} alt="Smile emoji" />
                  <h1>Avaliação enviada!</h1>
                  <span>Agradecemos pelo seu tempo e colaboração.</span>

                  <button onClick={handleToggleNotificationSendEvaluation}>
                    Disponha :)
                  </button>
                </ContentNotificationSendEvaluation>
              </DialogModalNotificationSendEvaluation>
            </ContainerNotificationSendEvaluation>
          )}
        </Container>
      )}
    </>
  );
};

export default Place;
