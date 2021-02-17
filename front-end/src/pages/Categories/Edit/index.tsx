import React, { useState, useEffect, useCallback } from "react";
import { FiCalendar, FiCamera, FiCoffee, FiInfo } from "react-icons/fi";
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
  icon: string;
}

interface FormProps {
  name: string;
}

interface Props {
  match: {
    params: {
      id: string;
    };
  };
}

const EditCategorie: React.FC<Props> = (props) => {
  const history = useHistory();
  const { addToast } = useToast();

  const [menuIcons, setMenuIcons] = useState<MenuIconsProps>({
    toggle: false,
    icon: "FiCamera",
  });
  const [form, setForm] = useState<FormProps>({
    name: "",
  });

  useEffect(() => {
    if (!props.match.params?.id) history.push("/categories");
  }, [history, props.match.params?.id]);

  useEffect(() => {
    api
      .get(`/categories/${props.match.params?.id}`)
      .then(({ data }) => {
        setForm({
          name: data.name,
        });
        setMenuIcons((state) => {
          return {
            ...state,
            icon: data.iconName,
          };
        });
      })
      .catch(() => {
        history.push("/categories");
      });
  }, [props.match.params?.id, history]);

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

      try {
        await api.post(`/categories/update/${props.match.params?.id}`, {
          name: form.name,
          iconName: menuIcons.icon,
        });

        addToast({
          title: "Categoria atualizada com sucesso",
          description: `A categoria ${form.name} foi atualizada com sucesso!`,
          type: "success",
        });

        history.goBack();
      } catch (err) {
        addToast({
          title: "Error ao atualizar a categoria",
          description: err.message,
          type: "error",
        });
      }
    },
    [form.name, menuIcons.icon, props.match.params?.id, addToast, history]
  );

  return (
    <Container>
      <HeaderAdmin
        lastPage="categories"
        MiddleContent={{
          message: "Editar",
        }}
      />
      <MenuAdmin optionSelectedMenu={2} />

      <ContainerStructure>
        <ContainerContent>
          <form onSubmit={handleSubmit}>
            <header>
              <span>Editar categoria</span>
            </header>

            <Content>
              <h3>Dados</h3>

              <hr />

              <div className="form-row">
                <div className="form-icon">
                  <label htmlFor="icon_name">Ícone</label>
                  <div className="icon" onClick={handleToggleMenuIcons}>
                    <Icon iconName={menuIcons.icon} size={64} color="#F25D27" />
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
                    value={form.name}
                    required
                  />
                </div>
              </div>

              <footer>
                <div>
                  <FiInfo size={36} color="#F25D27" />

                  <span>Preencha todos os dados com cuidado.</span>
                </div>

                <button type="submit">Guardar alterações</button>
              </footer>
            </Content>
          </form>
        </ContainerContent>
      </ContainerStructure>
    </Container>
  );
};

export default EditCategorie;
