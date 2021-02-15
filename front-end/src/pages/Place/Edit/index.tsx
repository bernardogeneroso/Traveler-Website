import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import {
  FiCalendar,
  FiCamera,
  FiCoffee,
  FiInfo,
  FiEdit3,
} from "react-icons/fi";
import { MapContainer, TileLayer } from "react-leaflet";

import HeaderAdmin from "../../../components/Main/HeaderAdmin";
import MenuAdmin from "../../../components/Main/MenuAdmin";
import { useToast } from "../../../hooks/Toast";

import {
  Container,
  ContainerStructure,
  ContainerContent,
  Content,
  ContainerCategories,
  ContentCategories,
  ContainerAddress,
  BackgroundImageCity,
  ContainerAttendance,
  ContentAttendance,
} from "./styles";
import api from "../../../services/api";
import { PlaceProps } from "../../City";

interface FormProps {
  name: string;
  imageSettings: {
    image: string;
    change: 0 | 1;
    file?: File;
  };
  description: string;
  categoryCheck?: 1 | 2 | 3 | true;
  local: {
    address: string;
  };
}

interface AttendanceProps {
  open: boolean;
  day: string;
  time: {
    start: string;
    end: string;
  };
}

interface Props {
  match: {
    params: {
      id: string;
    };
  };
}

const Edit: React.FC<Props> = (props) => {
  const history = useHistory();
  const { addToast } = useToast();

  const [attendances, setAttendances] = useState<AttendanceProps[]>(() => {
    const attendanceRows: AttendanceProps[] = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sabádo",
    ].map((day: string) => {
      return {
        open: false,
        day,
        time: {
          start: "-",
          end: "-",
        },
      };
    });

    return attendanceRows;
  });
  const [form, setForm] = useState<FormProps>({
    name: "",
    description: "",
    imageSettings: {
      image: "",
      change: 0,
    },
    local: {
      address: "",
    },
  });

  useEffect(() => {
    if (!props.match.params?.id) history.push("/cities");
  }, [props, history]);

  useEffect(() => {
    api
      .get<PlaceProps>(`/places/${props.match.params.id}`)
      .then(({ data }) => {
        setForm((state) => {
          return {
            name: data.place_name,
            description: data.description,
            categoryCheck:
              data.iconName === "FiCoffee"
                ? 1
                : data.iconName === "FiCamera"
                ? 2
                : 3,
            imageSettings: { ...state.imageSettings, image: data.image },
            local: { address: data.address },
          };
        });
      })
      .catch((err) => {
        history.push("/cities");
      });
  }, [props.match.params.id, history]);

  const handleForm = useCallback((value: number, event: any) => {
    if (value === 1) {
      const name = event.target.value;

      setForm((state) => ({
        ...state,
        name,
      }));
    } else if (value === 2) {
      const description = event.target.value;

      setForm((state) => ({
        ...state,
        description,
      }));
    } else if (value === 3) {
      const file = event.target.files[0];

      setForm((state) => ({
        ...state,
        image: file,
      }));
    } else if (value === 4) {
      const address = event.target.value;

      setForm((state) => ({
        ...state,
        local: {
          ...state.local,
          address,
        },
      }));
    } else if (value === 5) {
      const postalCode_1 = event.target.value;

      setForm((state) => ({
        ...state,
        local: {
          ...state.local,
          postalCode_1,
        },
      }));
    } else if (value === 6) {
      const postalCode_2 = event.target.value;

      setForm((state) => ({
        ...state,
        local: {
          ...state.local,
          postalCode_2,
        },
      }));
    } else if (value === 7) {
      const locality = event.target.value;

      setForm((state) => ({
        ...state,
        local: {
          ...state.local,
          locality,
        },
      }));
    }
  }, []);

  const handleCategories = useCallback((category: 1 | 2 | 3) => {
    setForm((state) => ({
      ...state,
      categoryCheck: category,
    }));
  }, []);

  const handleToggleAttendance = useCallback((day: string) => {
    setAttendances((state) => {
      const editAttendanceNow = state.map((attendanceNow: AttendanceProps) => {
        if (day === attendanceNow.day) {
          const open = !attendanceNow.open;

          if (open)
            return {
              ...attendanceNow,
              open,
              time: {
                start: "",
                end: "",
              },
            };

          return {
            ...attendanceNow,
            open,
            time: {
              start: "-",
              end: "-",
            },
          };
        }

        return attendanceNow;
      });

      return editAttendanceNow;
    });
  }, []);

  const handleChangeTextAttendance = useCallback(
    (day: string, position: number, event: any) => {
      setAttendances((state) => {
        const editAttendanceNow = state.map(
          (attendanceNow: AttendanceProps) => {
            if (day === attendanceNow.day) {
              if (!attendanceNow.open) return attendanceNow;

              if (position === 1) {
                return {
                  ...attendanceNow,
                  time: {
                    ...attendanceNow.time,
                    start: event.target.value,
                  },
                };
              }

              return {
                ...attendanceNow,
                time: {
                  ...attendanceNow.time,
                  end: event.target.value,
                },
              };
            }

            return attendanceNow;
          }
        );

        return editAttendanceNow;
      });
    },
    []
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (form.description.length > 320) return;

      if (!form.categoryCheck) {
        setForm((state) => ({
          ...state,
          categoryCheck: true,
        }));

        return;
      }

      try {
        /*var {
          name: nameCity,
          description: descriptionCity,
          image: imageCity,
        } = props.location.state.city;

        var formDataCity = new FormData();
        formDataCity.append("city-image", imageCity);
        formDataCity.append("name", nameCity);
        formDataCity.append("description", descriptionCity);

        const {
          data: { id, image: pathImage },
        } = await api.post("/cities/create", formDataCity);

        /*addCity({
          id,
          image: pathImage,
          name: nameCity,
          description: descriptionCity,
        });

        addToast({
          title: "Cidade criada com sucesso",
          description: `A cidade ${nameCity} foi criada com sucesso!`,
          type: "success",
        });

        var {
          name,
          image,
          description,
          categoryCheck,
          local: { address, locality, postalCode_1, postalCode_2 },
        } = form;

        if (image === true) return;
        if (categoryCheck === true) return;

        const addressConcated = `${address}, ${postalCode_1}-${postalCode_2}, ${locality}`;

        var formData = new FormData();
        formData.append("place-image", image);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", categoryCheck.toString());
        formData.append("address", addressConcated);
        formData.append("rating", "4.8");

        await api.post(`/places/create/${id}`, formData);

        addToast({
          title: "Local criada com sucesso",
          description: `O local ${name} foi criada com sucesso!`,
          type: "success",
        });

        setNewCityId(id);
        handleToggleFormRegistered();*/
      } catch (err) {
        addToast({
          title: "Error on create",
          type: "error",
        });
      }
    },
    [form, addToast]
  );

  return (
    <Container>
      <HeaderAdmin
        lastPage="cities"
        middleContent="Editar"
        cityEditName={form.name}
      />
      <MenuAdmin />

      <ContainerStructure>
        <ContainerContent>
          <form onSubmit={handleSubmit}>
            <header>
              <span>Editar local da cidade</span>
            </header>

            <Content
              maxCharacther={form.description.length > 320 ? true : false}
            >
              <h3>Dados Básicos</h3>

              <hr />

              <div className="form-input">
                <label htmlFor="name">Nome do local *</label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  onChange={(event) => handleForm(1, event)}
                  value={form.name}
                  required
                />
              </div>

              <div className="form-image-upload">
                <label>Foto da cidade *</label>
                <BackgroundImageCity
                  image={
                    typeof form.imageSettings.image === "string"
                      ? `${process.env.REACT_APP_API_URL}/places/image/${form.imageSettings.image}`
                      : ""
                  }
                  imageChange={!!form.imageSettings.change}
                >
                  <div />

                  {form.imageSettings.change ? (
                    <div className="focus">Foto alterada</div>
                  ) : (
                    ""
                  )}

                  <label htmlFor="file-upload">
                    <FiEdit3 size={26} color="#617480" />
                    <input
                      name="file"
                      id="file-upload"
                      type="file"
                      onChange={(event) => handleForm(3, event)}
                    />
                  </label>
                </BackgroundImageCity>
              </div>

              <div className="form-textarea">
                <label htmlFor="description">Descrição do local *</label>
                <textarea
                  name="description"
                  id="description"
                  rows={10}
                  onChange={(event) => handleForm(2, event)}
                  value={form.description}
                  required
                />
                <span>
                  {form.description.length !== 0 &&
                    `(${form.description.length})  `}
                  Máximo 320 caracteres
                </span>
              </div>

              <div className="form-categories">
                <label className={form.categoryCheck === true ? "error" : ""}>
                  Selecione uma categoria *
                </label>

                <ContainerCategories>
                  <ContentCategories
                    key="1"
                    className={form.categoryCheck === true ? "error" : ""}
                  >
                    <div className={form.categoryCheck === true ? "error" : ""}>
                      <FiCoffee size={46} color="#F25D27" />

                      <div className="form-checkbox">
                        <input
                          name="selectCoffee1"
                          type="checkbox"
                          onChange={() => handleCategories(1)}
                          checked={
                            form.categoryCheck === undefined
                              ? false
                              : form.categoryCheck === 1 && true
                          }
                          id="selectCoffee1"
                        />
                        <label htmlFor="selectCoffee1"></label>
                      </div>
                    </div>

                    <div>
                      <span>Comida e Bebida</span>
                    </div>
                  </ContentCategories>
                  <ContentCategories
                    key="2"
                    className={form.categoryCheck === true ? "error" : ""}
                  >
                    <div className={form.categoryCheck === true ? "error" : ""}>
                      <FiCamera size={46} color="#F25D27" />

                      <div className="form-checkbox">
                        <input
                          name="selectCoffee2"
                          type="checkbox"
                          onChange={() => handleCategories(2)}
                          checked={
                            form.categoryCheck === undefined
                              ? false
                              : form.categoryCheck === 2 && true
                          }
                          id="selectCoffee2"
                        />
                        <label htmlFor="selectCoffee2"></label>
                      </div>
                    </div>

                    <div>
                      <span>Pontos Turísticos</span>
                    </div>
                  </ContentCategories>
                  <ContentCategories
                    key="3"
                    className={form.categoryCheck === true ? "error" : ""}
                  >
                    <div className={form.categoryCheck === true ? "error" : ""}>
                      <FiCalendar size={46} color="#F25D27" />

                      <div className="form-checkbox">
                        <input
                          name="selectCoffee3"
                          type="checkbox"
                          onChange={() => handleCategories(3)}
                          checked={
                            form.categoryCheck === undefined
                              ? false
                              : form.categoryCheck === 3 && true
                          }
                          id="selectCoffee3"
                        />
                        <label htmlFor="selectCoffee3"></label>
                      </div>
                    </div>

                    <div>
                      <span>Eventos Organizados</span>
                    </div>
                  </ContentCategories>
                </ContainerCategories>
              </div>

              {form.categoryCheck === 1 && (
                <div className="form-attendance">
                  <h3>Atendimento</h3>

                  <hr />

                  <ContainerAttendance>
                    {attendances.map((attendance: AttendanceProps) => (
                      <ContentAttendance>
                        <div>
                          <span>{attendance.day}</span>
                          <button
                            className={attendance.open ? "focus" : ""}
                            onClick={() =>
                              handleToggleAttendance(attendance.day)
                            }
                          >
                            Aberto
                          </button>
                          <button
                            className={attendance.open ? "" : "focus"}
                            onClick={() =>
                              handleToggleAttendance(attendance.day)
                            }
                          >
                            Fechado
                          </button>
                        </div>
                        <div className={attendance.open ? "" : "block"}>
                          <span>Das</span>
                          <input
                            type="text"
                            onChange={(event) =>
                              handleChangeTextAttendance(
                                attendance.day,
                                1,
                                event
                              )
                            }
                            value={attendance.time.start}
                          />
                          <span>Até</span>
                          <input
                            type="text"
                            onChange={(event) =>
                              handleChangeTextAttendance(
                                attendance.day,
                                2,
                                event
                              )
                            }
                            value={attendance.time.end}
                          />
                        </div>
                      </ContentAttendance>
                    ))}
                  </ContainerAttendance>
                </div>
              )}

              <div className="form-location">
                <h3>Endereço</h3>

                <hr />

                <ContainerAddress>
                  <div className="form-address">
                    <label htmlFor="address">Rua, Avenida, etc. *</label>
                    <input
                      name="address"
                      type="text"
                      onChange={(event) => handleForm(4, event)}
                      id="address"
                      value={form.local.address}
                      required
                    />
                  </div>
                </ContainerAddress>
              </div>

              <div className="form-map">
                <MapContainer
                  center={[37.1362, -8.5377]}
                  zoom={14}
                  scrollWheelZoom={false}
                  style={{ height: 180, borderRadius: 10, zIndex: 0 }}
                  maxZoom={18}
                >
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                </MapContainer>
              </div>

              <footer>
                <div>
                  <FiInfo size={36} color="#F25D27" />

                  <span>Preencha todos os dados com cuidado.</span>
                </div>

                <button>Concluir cadastro</button>
              </footer>
            </Content>
          </form>
        </ContainerContent>
      </ContainerStructure>
    </Container>
  );
};

export default Edit;
