import React, { useState, useEffect, useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  FiCalendar,
  FiCamera,
  FiCoffee,
  FiEdit3,
  FiInfo,
  FiTrash,
} from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { MapContainer, TileLayer } from "react-leaflet";

import HeaderAdmin from "../../../../components/Main/HeaderAdmin";
import MenuAdmin from "../../../../components/Main/MenuAdmin";
import api from "../../../../services/api";
import { useToast } from "../../../../hooks/Toast";
import { useCities } from "../../../../hooks/CitiesManager";

import {
  Container,
  ContainerStructure,
  ContainerContent,
  Content,
  ContainerCategories,
  ContentCategories,
  ContainerAddress,
  ContainerModalFormRegistered,
  DialogModalFormRegistered,
  ContentModalFormRegistered,
  ContainerCheck,
  ContentCities,
  ContentStructure,
  ContainerOptions,
  ContentTopRating,
  Rating,
} from "./styles";

import circleCheck from "../../../../assets/stage02/circle-check.png";
import check from "../../../../assets/stage02/check.png";
import arrowCheck from "../../../../assets/stage02/arrow-check.png";

interface FormProps {
  name: string;
  image?: File | true;
  description: string;
  categoryCheck?: 1 | 2 | 3 | true;
  local: {
    address: string;
    postalCode_1?: number;
    postalCode_2?: number;
    locality: string;
  };
}

interface Props {
  location: {
    state: {
      city: {
        name: string;
        image: File;
        description: string;
      };
    };
  };
}

const Stage02: React.FC<Props> = (props) => {
  const history = useHistory();
  const { addToast } = useToast();
  const { addCity } = useCities();

  const [modalFormRegistered, setModalFormRegistered] = useState<boolean>(
    false
  );
  const [newCityId, setNewCityId] = useState<number | undefined>(undefined);
  const [form, setForm] = useState<FormProps>({
    name: "",
    description: "",
    local: {
      address: "",
      locality: "",
    },
  });

  useEffect(() => {
    if (!props.location.state?.city) history.push("/cities/stage01/create");
  }, [props, history]);

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
        image: file,
      }));
    }
  }, []);

  const handleCategories = useCallback((category: 1 | 2 | 3) => {
    setForm((state) => ({
      ...state,
      categoryCheck: category,
    }));
  }, []);

  const handleToggleFormRegistered = useCallback(() => {
    setModalFormRegistered((state) => !state);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!form.image) {
        setForm((state) => ({
          ...state,
          image: true,
        }));

        return;
      }

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
          name: nameCity,
          description: descriptionCity,
          image: imageCity,
        } = props.location.state.city;

        var formDataCity = new FormData();
        formDataCity.append("city-image", imageCity);
        formDataCity.append("name", nameCity);
        formDataCity.append("description", descriptionCity);

        const { data } = await api.post("/cities/create", formDataCity);

        addCity(data);

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

        await api.post(`/places/create/${data.id}`, formData);

        addToast({
          title: "Local criada com sucesso",
          description: `O local ${name} foi criada com sucesso!`,
          type: "success",
        });

        setNewCityId(data.id);
        handleToggleFormRegistered();
      } catch (err) {
        addToast({
          title: "Error on create",
          type: "error",
        });
      }
    },
    [
      form,
      props.location.state?.city,
      addToast,
      handleToggleFormRegistered,
      addCity,
    ]
  );

  return (
    <Container>
      <HeaderAdmin
        lastPage="cities"
        MiddleContent={{
          message: "Adicionar um local",
        }}
        stage={2}
      />
      <MenuAdmin />

      <ContainerStructure>
        <ContainerContent>
          <form onSubmit={handleSubmit}>
            <header>
              <div>02</div>

              <span>Adicione um local</span>
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
                  required
                />
              </div>

              <div className="form-image-upload">
                <label className={form.image === true ? "error" : ""}>
                  Foto da cidade *
                </label>
                <div>
                  <label
                    htmlFor="file-upload"
                    className={form.image && form.image !== true ? "focus" : ""}
                  >
                    {!form.image || form.image === true
                      ? "+ Adicionar uma foto"
                      : "Foto adicionada, alterar foto"}
                  </label>
                  <input
                    name="file"
                    id="file-upload"
                    type="file"
                    onChange={(event) => handleForm(3, event)}
                  />
                </div>
              </div>

              <div className="form-textarea">
                <label htmlFor="description">Descrição do local *</label>
                <textarea
                  name="description"
                  id="description"
                  rows={10}
                  onChange={(event) => handleForm(1, event)}
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
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-postal-code">
                      <label htmlFor="postal-code">Código Postal *</label>

                      <div>
                        <input
                          name="postalCode1"
                          type="text"
                          onChange={(event) => handleForm(2, event)}
                          pattern="[0-9]{4}"
                          placeholder="0000"
                          required
                        />
                        <span>-</span>
                        <input
                          name="postalCode2"
                          type="text"
                          onChange={(event) => handleForm(2, event)}
                          pattern="[0-9]{3}"
                          placeholder="000"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-locality">
                      <label htmlFor="locality">Localidade *</label>
                      <input
                        name="locality"
                        type="text"
                        onChange={(event) => handleForm(2, event)}
                        id="locality"
                        required
                      />
                    </div>
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

                <button>Concluir registo</button>
              </footer>
            </Content>
          </form>
        </ContainerContent>
      </ContainerStructure>

      {modalFormRegistered && (
        <ContainerModalFormRegistered>
          <DialogModalFormRegistered>
            <ContentModalFormRegistered>
              <div className="structure-left">
                <ContainerCheck>
                  <img src={circleCheck} alt="Circle check" />
                  <img src={check} alt="Check" />
                  <img src={arrowCheck} alt="Arrow check" />
                </ContainerCheck>

                <h1>Perfil cadastrado!</h1>

                <p>
                  Você tem uma nova cidade e um novo ponto cadastrado. Continue
                  sempre adicionando locais incríveis.
                </p>

                <Link to={`/city/${newCityId}`}>
                  <button>Okay</button>
                </Link>
              </div>

              <div className="structure-right">
                <ContentCities>
                  <ContentStructure>
                    <img
                      src="http://localhost:3333/cities/image/a1a96b1a782772066ab7-florianopolis.jpg"
                      alt="Florianópolis"
                    />

                    <Link to={`/city/4`}>
                      <div className="informations">
                        <h3>Florianópolis</h3>
                        <span>{Math.floor(Math.random() * 100)} locais</span>
                      </div>
                    </Link>

                    <ContainerOptions>
                      <div>
                        <FiEdit3 size={20} color="#617480" />
                      </div>
                      <div>
                        <FiTrash size={20} color="#617480" />
                      </div>
                    </ContainerOptions>
                  </ContentStructure>
                </ContentCities>

                <ContentTopRating className="allPlaces">
                  <img
                    src="http://localhost:3333/places/images/5d629d7379e12049aea4-doce_&_companhia.jpg"
                    alt="Doce & Companhia"
                  />

                  <Link
                    to={`/place/1`}
                    style={{
                      textDecoration: "none",
                    }}
                    className="informations"
                  >
                    <h3>Doce & Companhia</h3>

                    <div className="category">
                      Comida e Bebida
                      <FiCoffee size={22} color="#F25D27" />
                    </div>

                    <Rating>
                      <AiFillStar size={26} color="#fff" />
                      4,9
                    </Rating>
                  </Link>

                  <ContainerOptions>
                    <div>
                      <FiEdit3 size={20} color="#617480" />
                    </div>
                    <div>
                      <FiTrash size={20} color="#617480" />
                    </div>
                  </ContainerOptions>
                </ContentTopRating>
              </div>
            </ContentModalFormRegistered>
          </DialogModalFormRegistered>
        </ContainerModalFormRegistered>
      )}
    </Container>
  );
};

export default Stage02;
