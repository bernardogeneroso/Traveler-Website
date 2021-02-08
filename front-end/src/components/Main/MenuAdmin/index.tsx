import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiPower, FiMapPin, FiGrid, FiMessageSquare } from "react-icons/fi";

import { useAuth } from "../../../hooks/Auth";

import { Container, Content, ContainerOptions } from "./styles";

import logo from "../../../assets/menuadmin/logo.png";

const MenuAdmin = () => {
  const { signOut } = useAuth();

  const [optionSelected, setOptionSelected] = useState<number>(1);

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

        <FiPower size={24} color="#fff" className="power" onClick={signOut} />
      </Content>
    </Container>
  );
};

export default MenuAdmin;
