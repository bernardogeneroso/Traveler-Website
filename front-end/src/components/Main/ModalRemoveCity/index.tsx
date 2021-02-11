import React, { useCallback } from "react";

import { CityProps } from "../../../pages/Cities";
import { useCities } from "../../../hooks/CitiesManager";
import { useHistory } from "react-router-dom";

import { Container, Dialog, Content, ContainerShow } from "./styles";

import vector from "../../../assets/modalremovecity/vector.png";
import vector1 from "../../../assets/modalremovecity/vector1.png";
import vector2 from "../../../assets/modalremovecity/vector2.png";
import trash from "../../../assets/modalremovecity/trash.png";

interface ModalRemoveCityProps {
  city?: CityProps;
  redirect?: boolean;
  handleToggle(): void;
}

export interface ModalRemoceCityProperties {
  toggle: boolean;
  city?: CityProps;
}

const ModalRemoveCity: React.FC<ModalRemoveCityProps> = ({
  city,
  redirect,
  handleToggle,
}) => {
  const history = useHistory();
  const { removeCity } = useCities();

  const handleRomoveCity = useCallback(
    (id: number | undefined = undefined) => {
      if (id) {
        removeCity(id);
        handleToggle();

        if (redirect) history.push("/cities");
      }
    },
    [removeCity, handleToggle, history, redirect]
  );

  return (
    <Container>
      <Dialog>
        <Content>
          <ContainerShow>
            <img src={vector} alt="Vector 1" />
            <img src={vector1} alt="Vector 2" />
            <img src={vector2} alt="Vector 3" />
            <img src={trash} alt="Trash" />
          </ContainerShow>

          <h1>Excluir cidade</h1>

          <span>
            Tem certeza que quer excluir a cidade de {city?.name} e os seus 98
            locais?
          </span>

          <div>
            <button onClick={handleToggle}>Não</button>
            <button onClick={() => handleRomoveCity(city?.id)}>Sim</button>
          </div>
        </Content>
      </Dialog>
    </Container>
  );
};

export default ModalRemoveCity;
