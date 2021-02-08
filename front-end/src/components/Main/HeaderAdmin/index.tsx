import React from "react";
import { Link } from "react-router-dom";
import { FiEdit3, FiTrash, FiArrowLeft } from "react-icons/fi";

import {
  Container,
  ContainerStructure,
  ContainerMiddle,
  ContainerLeft,
  ContainerRight,
} from "./styles";

interface HeaderProps {
  lastPage?: string;
  middleContent?: string;
  cityId?: number;
}

const Header: React.FC<HeaderProps> = ({ lastPage, middleContent, cityId }) => {
  return (
    <Container>
      <ContainerStructure>
        <ContainerLeft>
          {lastPage ? (
            <Link to={`/${lastPage}`}>
              <div>
                <FiArrowLeft size={22} color="#A0ACB2" />
              </div>
            </Link>
          ) : (
            <h1>Cidades</h1>
          )}
        </ContainerLeft>

        {middleContent && <ContainerMiddle>{middleContent}</ContainerMiddle>}

        <ContainerRight>
          {cityId && (
            <>
              <div>
                <FiEdit3 size={20} color="#617480" />
              </div>
              <div>
                <FiTrash size={20} color="#617480" />
              </div>
            </>
          )}

          <button>+ Adicionar um perfil</button>
        </ContainerRight>
      </ContainerStructure>
    </Container>
  );
};

export default Header;
