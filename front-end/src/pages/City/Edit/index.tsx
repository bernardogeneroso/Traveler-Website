import React, { useState, useCallback, useEffect } from "react";
import { FiEdit3, FiInfo } from "react-icons/fi";
import { useHistory, useParams } from "react-router-dom";

import HeaderAdmin from "../../../components/Main/HeaderAdmin";
import MenuAdmin from "../../../components/Main/MenuAdmin";
import { useCities } from "../../../hooks/CitiesManager";
import { useToast } from "../../../hooks/Toast";
import api from "../../../services/api";

import {
  Container,
  ContainerStructure,
  ContainerContent,
  Content,
  BackgroundImageCity,
} from "./styles";

interface FormProps {
  name: string;
  imageSettings: {
    image: string;
    change: 0 | 1;
    file?: File;
  };
  description: string;
}

interface ParamsProps {
  id: string;
}

const Edit: React.FC = () => {
  const history = useHistory();
  const params = useParams<ParamsProps>();
  const { addToast } = useToast();
  const { editCity } = useCities();

  const [form, setForm] = useState<FormProps>({
    name: "",
    description: "",
    imageSettings: {
      image: "",
      change: 0,
    },
  });

  useEffect(() => {
    const { id } = params;

    if (!id) history.push("/cities");

    api.get(`/cities/${id}`).then(({ data }) => {
      setForm({
        name: data.name,
        description: data.description,
        imageSettings: {
          image: `${process.env.REACT_APP_API_URL}/cities/image/${data.image}`,
          change: 0,
        },
      });
    });
  }, [history, params]);

  const handleForm = useCallback((value: number, event: any) => {
    if (value === 1) {
      const value = event.target.value;
      const target = event.target.name;

      setForm((state) => ({
        ...state,
        [target]: value,
      }));
    } else if (value === 2) {
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

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (form.description.length > 320) return;

      try {
        const {
          imageSettings: { file, image },
          name,
          description,
        } = form;

        const formData = new FormData();
        file
          ? formData.append("update-image", file)
          : formData.append("image", image.split("image/")[1]);
        formData.append("name", name);
        formData.append("description", description);

        const { id } = params;

        const { data } = await api.post(`/cities/update/${id}`, formData);

        editCity(data);

        addToast({
          title: "Cidade atualizada com sucesso",
          description: `A cidade ${name} foi atualizada com sucesso!`,
          type: "success",
        });
      } catch (err) {
        addToast({
          title: "Error on update city",
          description: err.response.data.message,
          type: "error",
        });
      }
    },
    [form, addToast, params, editCity]
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
              <span>Editar cidade</span>
            </header>

            <Content
              maxCharacther={form.description.length > 320 ? true : false}
            >
              <h3>Dados de cidade</h3>

              <hr />

              <div className="form-input">
                <label htmlFor="name">Nome da cidade *</label>
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
                    form.imageSettings.change === 0
                      ? form.imageSettings.image
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
                <label htmlFor="description">Descrição da cidade *</label>
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

              <footer>
                <div>
                  <FiInfo size={36} color="#F25D27" />

                  <span>Preencha todos os dados com cuidado.</span>
                </div>

                <button type="submit">Quardar alterações</button>
              </footer>
            </Content>
          </form>
        </ContainerContent>
      </ContainerStructure>
    </Container>
  );
};

export default Edit;
