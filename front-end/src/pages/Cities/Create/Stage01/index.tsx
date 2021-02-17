import React, { useState, useCallback } from "react";
import { FiInfo } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import HeaderAdmin from "../../../../components/Main/HeaderAdmin";
import MenuAdmin from "../../../../components/Main/MenuAdmin";

import {
  Container,
  ContainerStructure,
  ContainerContent,
  Content,
} from "./styles";

interface FormProps {
  name: string;
  image?: File;
  description: string;
}

const Stage01: React.FC = () => {
  const history = useHistory();

  const [form, setForm] = useState<FormProps>({
    name: "",
    description: "",
  });

  const handleForm = useCallback((value: number, event: any) => {
    if (value === 1) {
      const name = event.target.value;
      const target = event.target.name;

      setForm((state) => ({
        ...state,
        [target]: name,
      }));
    } else if (value === 2) {
      const file = event.target.files[0];

      setForm((state) => ({
        ...state,
        image: file,
      }));
    }
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (form.description.length > 320) return;

      history.push({
        pathname: "/cities/stage02/create",
        state: {
          city: form,
        },
      });
    },
    [history, form]
  );

  return (
    <Container>
      <HeaderAdmin
        lastPage="cities"
        MiddleContent={{
          message: "Adicionar uma cidade",
        }}
        stage={1}
      />
      <MenuAdmin />

      <ContainerStructure>
        <ContainerContent>
          <form onSubmit={handleSubmit}>
            <header>
              <div>01</div>

              <span>Adicione uma cidade</span>
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
                  required
                />
              </div>

              <div className="form-image-upload">
                <label>Foto da cidade *</label>
                <div>
                  <label
                    htmlFor="file-upload"
                    className={form.image ? "focus" : ""}
                  >
                    {!form.image
                      ? "+ Adicionar uma foto"
                      : "Foto adicionada, alterar foto"}
                  </label>
                  <input
                    name="file"
                    id="file-upload"
                    type="file"
                    onChange={(event) => handleForm(2, event)}
                    required
                  />
                </div>
              </div>

              <div className="form-textarea">
                <label htmlFor="description">Descrição da cidade *</label>
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

              <footer>
                <div>
                  <FiInfo size={36} color="#F25D27" />

                  <span>Preencha todos os dados com cuidado.</span>
                </div>

                <button type="submit">Próximo</button>
              </footer>
            </Content>
          </form>
        </ContainerContent>
      </ContainerStructure>
    </Container>
  );
};

export default Stage01;
