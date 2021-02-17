import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import {
  FiCalendar,
  FiCamera,
  FiCoffee,
  FiInfo,
  FiEdit3,
} from "react-icons/fi";
import DatePicker from "react-date-picker";
import { MapContainer, TileLayer } from "react-leaflet";
import { addDays, getYear } from "date-fns";
import { v4 as uuidv4 } from "uuid";

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
  ContainerNextEvent,
} from "./styles";
import api from "../../../services/api";
import { CategoriesProps, PlaceProps } from "../../City";

interface FormProps {
  name: string;
  imageSettings: {
    image: string;
    change: 0 | 1;
    file?: File;
  };
  description: string;
  categoryCheck?: "FiCoffee" | "FiCamera" | "FiCalendar" | true;
  local: {
    address: string;
    phone_number: string;
  };
}

interface AttendanceProps {
  id: string;
  open: boolean;
  day: string;
  time: {
    start: string;
    end: string;
  };
}

interface AttendanceRowProps {
  dayOfWeek: string;
  id: string;
  timeOpen: string;
  order: number;
  place_id: string;
  created_at: string;
  updated_at: string;
}

interface EventCalendarProps {
  id: string;
  startDay: Date;
  endDay: Date;
  year: string;
  place_id: string;
  created_at: string;
  updated_at: string;
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
        id: uuidv4(),
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
  const [datePicker, setDatePicker] = useState({
    startDay: addDays(new Date(), 2),
    endDay: addDays(new Date(), 5),
  });
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [form, setForm] = useState<FormProps>({
    name: "",
    description: "",
    imageSettings: {
      image: "",
      change: 0,
    },
    local: {
      address: "",
      phone_number: "",
    },
  });

  useEffect(() => {
    if (!props.match.params?.id) history.push("/cities");
  }, [props, history]);

  useEffect(() => {
    api
      .get<PlaceProps>(`/places/${props.match.params.id}`)
      .then(({ data }) => {
        // @ts-ignore
        setForm((state) => {
          return {
            name: data.place_name,
            description: data.description,
            categoryCheck: data.iconName,
            imageSettings: {
              ...state.imageSettings,
              image: data.image,
            },
            local: {
              address: data.address,
              phone_number: data.phone_number ? data.phone_number : "",
            },
          };
        });
      })
      .catch(() => {
        history.push("/cities");
      });
  }, [props.match.params.id, history]);

  useEffect(() => {
    if (form.categoryCheck === "FiCoffee") {
      api
        .get(`/places/show/service/${props.match.params.id}`)
        .then(({ data }) => {
          if (Object.keys(data).length === 0) return;

          setAttendances(() => {
            const attendanceRows: AttendanceProps[] = data.map(
              (attendanceRow: AttendanceRowProps) => {
                const timeOpen = attendanceRow.timeOpen.split(" - ");

                if (attendanceRow.timeOpen === "Fechado") {
                  return {
                    open: false,
                    day: attendanceRow.dayOfWeek,
                    id: attendanceRow.id,
                    time: {
                      start: "-",
                      end: "-",
                    },
                  };
                }

                return {
                  open: true,
                  day: attendanceRow.dayOfWeek,
                  id: attendanceRow.id,
                  time: {
                    start: timeOpen[0],
                    end: timeOpen[1],
                  },
                };
              }
            );

            return attendanceRows;
          });
        });
    } else if (form.categoryCheck === "FiCalendar") {
      api
        .get<EventCalendarProps>(`/places/show/event/${props.match.params.id}`)
        .then(({ data }) => {
          setDatePicker({
            startDay: new Date(data.startDay),
            endDay: new Date(data.endDay),
          });
        });
    }
  }, [form.categoryCheck, props.match.params.id]);

  useEffect(() => {
    api.get(`/categories`).then(({ data }) => {
      setCategories(data);
    });
  }, []);

  const handleForm = useCallback((value: number, event: any) => {
    if (value === 1) {
      const value = event.target.value;
      const target = event.target.name;

      setForm((state) => ({
        ...state,
        [target]: value,
      }));
    } else if (value === 2) {
      const value = event.target.value;
      const target = event.target.name;

      setForm((state) => ({
        ...state,
        local: {
          ...state.local,
          [target]: value,
        },
      }));
    } else if (value === 3) {
      const file = event.target.files[0];

      setForm((state) => ({
        ...state,
        imageSettings: {
          ...state.imageSettings,
          file: file,
          change: 1,
        },
      }));
    }
  }, []);

  const handleCategories = useCallback(
    (category: "FiCoffee" | "FiCamera" | "FiCalendar") => {
      setForm((state) => ({
        ...state,
        categoryCheck: category,
      }));
    },
    []
  );

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

  const handleDataPicker = useCallback(
    (eventName: string, value: Date | Date[]) => {
      setDatePicker((state) => {
        return {
          ...state,
          [eventName]: value,
        };
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
        var {
          name,
          description,
          categoryCheck,
          imageSettings: { image, file, change },
          local: { address, phone_number },
        } = form;

        var formData = new FormData();
        change === 1 && file
          ? formData.append("update-image", file)
          : formData.append("image", image);
        phone_number !== "" && formData.append("phone_number", phone_number);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("address", address);

        const lastPlace = localStorage.getItem("Traveler::EditPlace");
        if (!lastPlace) return;

        if (categoryCheck === "FiCoffee") {
          const findCategorie = categories.find(
            (categorie) => categorie.iconName === "FiCoffee"
          );

          if (!findCategorie) return;

          const service = attendances.map((attendanceRow) => {
            const firstHour = attendanceRow.time.start;
            const lastHour = attendanceRow.time.end;

            if (firstHour === "-" && lastHour === "-") return "Fechado";

            return `${firstHour} - ${lastHour}`;
          });

          formData.append("categorie_id", findCategorie.id);

          await api.post(`/places/update/${props.match.params.id}`, formData);
          await api.post(`/places/create/service/${props.match.params.id}`, {
            service,
          });
        } else if (categoryCheck === "FiCalendar") {
          const findCategorie = categories.find(
            (categorie) => categorie.iconName === "FiCalendar"
          );

          if (!findCategorie) return;

          const event = {
            startDay: new Date(datePicker.startDay),
            endDay: new Date(datePicker.endDay),
            year: getYear(datePicker.startDay),
          };

          formData.append("categorie_id", findCategorie.id);

          await api.post(`/places/update/${props.match.params.id}`, formData);
          await api.post(
            `/places/create/event/${props.match.params.id}`,
            event
          );
        } else if (categoryCheck === "FiCamera") {
          const findCategorie = categories.find(
            (categorie) => categorie.iconName === "FiCamera"
          );

          if (!findCategorie) return;

          formData.append("categorie_id", findCategorie.id);

          await api.post(`/places/update/${props.match.params.id}`, formData);
        }

        addToast({
          title: "Local atualizado com sucesso",
          description: `O local ${name} foi atualizado com sucesso!`,
          type: "success",
        });
      } catch (err) {
        addToast({
          title: "Error on create",
          type: "error",
        });
      }
    },
    [
      form,
      addToast,
      props.match.params.id,
      attendances,
      datePicker.endDay,
      datePicker.startDay,
      categories,
    ]
  );

  return (
    <Container>
      <HeaderAdmin
        lastPage="cities"
        MiddleContent={{
          message: "Editar",
        }}
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
                    !form.imageSettings.change
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
                <label
                  htmlFor="description"
                  className={form.description.length > 320 ? "error" : ""}
                >
                  Descrição do local *
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={10}
                  onChange={(event) => handleForm(1, event)}
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
                    selected={form.categoryCheck === "FiCoffee" ? true : false}
                  >
                    <div className={form.categoryCheck === true ? "error" : ""}>
                      <FiCoffee size={46} color="#F25D27" />

                      <div className="form-checkbox">
                        <input
                          name="selectCoffee1"
                          type="checkbox"
                          onChange={() => handleCategories("FiCoffee")}
                          checked={
                            form.categoryCheck === undefined
                              ? false
                              : form.categoryCheck === "FiCoffee" && true
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
                    selected={form.categoryCheck === "FiCamera" ? true : false}
                  >
                    <div className={form.categoryCheck === true ? "error" : ""}>
                      <FiCamera size={46} color="#F25D27" />

                      <div className="form-checkbox">
                        <input
                          name="selectCoffee2"
                          type="checkbox"
                          onChange={() => handleCategories("FiCamera")}
                          checked={
                            form.categoryCheck === undefined
                              ? false
                              : form.categoryCheck === "FiCamera" && true
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
                    selected={
                      form.categoryCheck === "FiCalendar" ? true : false
                    }
                  >
                    <div className={form.categoryCheck === true ? "error" : ""}>
                      <FiCalendar size={46} color="#F25D27" />

                      <div className="form-checkbox">
                        <input
                          name="selectCoffee3"
                          type="checkbox"
                          onChange={() => handleCategories("FiCalendar")}
                          checked={
                            form.categoryCheck === undefined
                              ? false
                              : form.categoryCheck === "FiCalendar" && true
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

              {form.categoryCheck === "FiCoffee" && (
                <div className="form-attendance">
                  <h3>Atendimento</h3>

                  <hr />

                  <ContainerAttendance>
                    {attendances.map((attendance: AttendanceProps) => (
                      <ContentAttendance key={attendance.id}>
                        <div className="contentInformation">
                          <span>{attendance.day}</span>
                          <button
                            type="button"
                            className={attendance.open ? "focus" : ""}
                            onClick={() =>
                              handleToggleAttendance(attendance.day)
                            }
                          >
                            Aberto
                          </button>
                          <button
                            type="button"
                            className={attendance.open ? "" : "focus"}
                            onClick={() =>
                              handleToggleAttendance(attendance.day)
                            }
                          >
                            Fechado
                          </button>
                        </div>
                        <div
                          className={
                            attendance.open
                              ? "contentTime"
                              : "contentTime block"
                          }
                        >
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

              {form.categoryCheck === "FiCalendar" && (
                <div className="form-next-event">
                  <h3>Próximo acontecimento</h3>

                  <hr />

                  <ContainerNextEvent>
                    <span className="first">De</span>
                    <DatePicker
                      value={datePicker.startDay}
                      onChange={(value) => handleDataPicker("startDay", value)}
                      format="dd/MM/y"
                      clearIcon={null}
                      calendarIcon={null}
                      className="format-date-picker"
                    />
                    <span className="last">Até</span>
                    <DatePicker
                      value={datePicker.endDay}
                      onChange={(value) => handleDataPicker("endDay", value)}
                      format="dd/MM/y"
                      clearIcon={null}
                      calendarIcon={null}
                      className="format-date-picker"
                    />
                  </ContainerNextEvent>
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
                      onChange={(event) => handleForm(2, event)}
                      id="address"
                      value={form.local.address}
                      required
                    />
                  </div>
                  {form.categoryCheck === "FiCoffee" && (
                    <div className="form-phone-number">
                      <label htmlFor="phone-number">
                        Número do telefone/telemóvel
                      </label>
                      <input
                        name="phone-number"
                        type="text"
                        onChange={(event) => handleForm(2, event)}
                        id="phone-number"
                        value={form.local.phone_number}
                        required
                      />
                    </div>
                  )}
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

                <button>Guardar alterações</button>
              </footer>
            </Content>
          </form>
        </ContainerContent>
      </ContainerStructure>
    </Container>
  );
};

export default Edit;
