import React, { useState, useCallback } from "react";
import { FiInfo } from "react-icons/fi";

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

const Stage02: React.FC = () => {
  const [form, setForm] = useState<FormProps>({
    name: "",
    description: "",
  });

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
    }
  }, []);

  return (
    <Container>
      <HeaderAdmin
        lastPage="cities"
        middleContent="Adicionar um local"
        stage={2}
      />
      <MenuAdmin />

      <ContainerStructure>
        <ContainerContent>
          <form>
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
                <label htmlFor="name">Nome do local</label>
                <input
                  id="name"
                  type="text"
                  onChange={(event) => handleForm(1, event)}
                />
              </div>

              <div className="form-image-upload">
                <label>Foto da cidade</label>
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
                    id="file-upload"
                    type="file"
                    onChange={(event) => handleForm(3, event)}
                  />
                </div>
              </div>

              <div className="form-textarea">
                <label htmlFor="description">Descrição do local</label>
                <textarea
                  id="description"
                  rows={10}
                  onChange={(event) => handleForm(2, event)}
                />
                <span>
                  {form.description.length !== 0 &&
                    `(${form.description.length})  `}
                  Máximo 320 caracteres
                </span>
              </div>

              <footer>
                <div>
                  <FiInfo size={26} color="#F25D27" />

                  <span>Preencha todos os dados com cuidado.</span>
                </div>

                <button>Próximo</button>
              </footer>
            </Content>
          </form>
        </ContainerContent>
      </ContainerStructure>
    </Container>
  );
};

export default Stage02;