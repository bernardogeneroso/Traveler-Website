import React, { useState, useCallback } from "react";
import { FiCalendar, FiCamera, FiCoffee, FiInfo, FiPlus } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import Icon from "../../../components/Icon";

import HeaderAdmin from "../../../components/Main/HeaderAdmin";
import MenuAdmin from "../../../components/Main/MenuAdmin";
import { useToast } from "../../../hooks/Toast";
import api from "../../../services/api";

import {
  Container,
  ContainerStructure,
  ContainerContent,
  Content,
} from "./styles";

interface MenuIconsProps {
  toggle: boolean;
  icon?: string;
}

interface FormProps {
  name: string;
}

const CreateCategorie: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();

  const [menuIcons, setMenuIcons] = useState<MenuIconsProps>({
    toggle: false,
  });
  const [form, setForm] = useState<FormProps>({
    name: "",
  });

  const handleToggleMenuIcons = useCallback(() => {
    setMenuIcons((state) => {
      return {
        ...state,
        toggle: !state.toggle,
      };
    });
  }, []);

  const handleToggleMenuIconsChange = useCallback((iconName: string) => {
    setMenuIcons((state) => {
      return {
        icon: iconName,
        toggle: !state.toggle,
      };
    });
  }, []);

  const handleForm = useCallback((event: any) => {
    const name = event.target.value;
    const target = event.target.name;

    setForm((state) => ({
      ...state,
      [target]: name,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!menuIcons.icon) return;

      try {
        await api.post("/categories/create", {
          name: form.name,
          iconName: menuIcons.icon,
        });

        addToast({
          title: "Categoria criada com sucesso",
          description: `A categoria ${form.name} foi criada com sucesso!`,
          type: "success",
        });

        history.goBack();
      } catch (err) {
        addToast({
          title: "Error ao criar a categoria",
          description: err.response.data.message,
          type: "error",
        });
      }
    },
    [form, addToast, history, menuIcons.icon]
  );

  return (
    <Container>
      <HeaderAdmin
        lastPage="categories"
        MiddleContent={{
          message: "Adicionar uma categoria",
        }}
      />
      <MenuAdmin optionSelectedMenu={2} />

      <ContainerStructure>
        <ContainerContent>
          <form onSubmit={handleSubmit}>
            <header>
              <span>Adicione uma categoria</span>
            </header>

            <Content>
              <h3>Dados</h3>

              <hr />

              <div className="form-row">
                <div className="form-icon">
                  <label
                    htmlFor="icon_name"
                    className={!menuIcons.icon ? "error" : ""}
                  >
                    Ícone *
                  </label>
                  <div className="icon" onClick={handleToggleMenuIcons}>
                    {menuIcons.icon ? (
                      <Icon
                        iconName={menuIcons.icon}
                        size={64}
                        color="#F25D27"
                      />
                    ) : (
                      <FiPlus size={24} color="#F25D27" />
                    )}
                  </div>

                  {menuIcons.toggle && (
                    <div className="menu-icons">
                      <div>
                        <FiCamera
                          size={24}
                          onClick={() =>
                            handleToggleMenuIconsChange("FiCamera")
                          }
                        />
                      </div>
                      <div>
                        <FiCoffee
                          size={24}
                          onClick={() =>
                            handleToggleMenuIconsChange("FiCoffee")
                          }
                        />
                      </div>
                      <div>
                        <FiCalendar
                          size={24}
                          onClick={() =>
                            handleToggleMenuIconsChange("FiCalendar")
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="form-input">
                  <label htmlFor="name">Nome da categoria *</label>
                  <input
                    name="name"
                    id="name"
                    type="text"
                    onChange={handleForm}
                    required
                  />
                </div>
              </div>

              <footer>
                <div>
                  <FiInfo size={36} color="#F25D27" />

                  <span>Preencha todos os dados com cuidado.</span>
                </div>

                <button type="submit">Concluir registo</button>
              </footer>
            </Content>
          </form>
        </ContainerContent>
      </ContainerStructure>
    </Container>
  );
};

export default CreateCategorie;
