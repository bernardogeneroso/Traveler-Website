import React from "react";

import Header from "../../components/Main/Header";

import {
  Container,
  ContainerContent,
  HeaderContainer,
  HeaderFilter,
} from "./styles";

const Citites: React.FC = () => {
  return (
    <Container>
      <Header restrict middleContent="search" />

      <ContainerContent>
        <HeaderContainer>
          <h1>Selecione uma cidade</h1>

          <HeaderFilter>
            <div>Todas</div>
            <div>Mais acessadas</div>
            <div>A-Z</div>
          </HeaderFilter>
        </HeaderContainer>
      </ContainerContent>
    </Container>
  );
};

export default Citites;
