import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FiPower, FiMapPin, FiGrid, FiMessageSquare } from "react-icons/fi";

import { useAuth } from "../../../hooks/Auth";

import {
  Container,
  Content,
  ContainerOptions,
  ContainerModalLeave,
  DialogModalLeave,
  ContentModalLeave,
} from "./styles";

import logo from "../../../assets/menuadmin/logo.png";

const MenuAdmin = () => {
  const { signOut } = useAuth();

  const [optionSelected, setOptionSelected] = useState<number>(1);
  const [modalLeave, setModalLeave] = useState<boolean>(false);
  const [buttonLeave, setButtonLeave] = useState<number>(1);

  const handleToggleModalLeave = useCallback(() => {
    setModalLeave((state) => !state);
  }, []);

  return (
    <Container>
      <Content>
        <img src={logo} alt="Logo" />

        <ContainerOptions>
          <Link to="/cities">
            <FiMapPin
              size={24}
              onClick={() => setOptionSelected(1)}
              color={optionSelected === 1 ? "#fff" : "#FFA585"}
              title="Cidades"
            />
          </Link>
          <Link to="/cities">
            <FiGrid
              size={24}
              onClick={() => setOptionSelected(2)}
              color={optionSelected === 2 ? "#fff" : "#FFA585"}
              title="Categorias"
            />
          </Link>
          <Link to="/cities">
            <FiMessageSquare
              size={24}
              onClick={() => setOptionSelected(3)}
              color={optionSelected === 3 ? "#fff" : "#FFA585"}
              title="Comentários"
            />
          </Link>
        </ContainerOptions>

        <FiPower
          size={24}
          color="#fff"
          className="power"
          onClick={handleToggleModalLeave}
        />
      </Content>

      {modalLeave && (
        <ContainerModalLeave key="modalLeave">
          <DialogModalLeave>
            <ContentModalLeave buttonAnimation={buttonLeave}>
              <span>Você quer mesmo sair?</span>
              <div>
                <button
                  onClick={handleToggleModalLeave}
                  onMouseEnter={() => setButtonLeave(2)}
                  onMouseLeave={() => setButtonLeave(1)}
                >
                  Não
                </button>
                <button
                  onClick={signOut}
                  onMouseEnter={() => setButtonLeave(2)}
                  onMouseLeave={() => setButtonLeave(1)}
                >
                  Sim
                </button>
              </div>
            </ContentModalLeave>
          </DialogModalLeave>
        </ContainerModalLeave>
      )}
    </Container>
  );
};

export default MenuAdmin;
