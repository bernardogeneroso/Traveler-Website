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

interface MenuAdminProps {
  optionSelectedMenu?: 1 | 2 | 3;
}

const MenuAdmin: React.FC<MenuAdminProps> = ({ optionSelectedMenu }) => {
  const { signOut } = useAuth();

  const [optionSelected, setOptionSelected] = useState<1 | 2 | 3>(() => {
    return optionSelectedMenu ? optionSelectedMenu : 1;
  });
  const [modalLeave, setModalLeave] = useState<boolean>(false);

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
          <Link to="/categories">
            <FiGrid
              size={24}
              onClick={() => setOptionSelected(2)}
              color={optionSelected === 2 ? "#fff" : "#FFA585"}
              title="Categorias"
            />
          </Link>
          <Link to="/evaluations">
            <FiMessageSquare
              size={24}
              onClick={() => setOptionSelected(3)}
              color={optionSelected === 3 ? "#fff" : "#FFA585"}
              title="Avaliações"
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
            <ContentModalLeave>
              <span>Você quer mesmo sair?</span>
              <div>
                <button onClick={handleToggleModalLeave}>Não</button>
                <button onClick={signOut}>Sim</button>
              </div>
            </ContentModalLeave>
          </DialogModalLeave>
        </ContainerModalLeave>
      )}
    </Container>
  );
};

export default MenuAdmin;
