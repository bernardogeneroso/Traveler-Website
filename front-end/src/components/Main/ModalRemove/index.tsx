import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import { CityProps } from "../../../pages/Cities";
import { useCities } from "../../../hooks/CitiesManager";
import { CategoriesProps, PlaceProps } from "../../../pages/City";

import { Container, Dialog, Content, ContainerShow } from "./styles";

import vector from "../../../assets/modalremovecity/vector.png";
import vector1 from "../../../assets/modalremovecity/vector1.png";
import vector2 from "../../../assets/modalremovecity/vector2.png";
import trash from "../../../assets/modalremovecity/trash.png";
import api from "../../../services/api";

interface ModalRemoveCityProps {
  city?: CityProps;
  place?: PlaceProps;
  categorie?: CategoriesProps;
  redirect?: boolean;
  handleToggle(): void;
}

export interface ModalRemoceProperties {
  toggle: boolean;
  city?: CityProps;
  place?: PlaceProps;
}

const ModalRemove: React.FC<ModalRemoveCityProps> = ({
  city,
  place,
  redirect,
  handleToggle,
}) => {
  const history = useHistory();
  const { removeCity } = useCities();

  const handleRomove = useCallback(async () => {
    if (city) removeCity(city.id);
    if (place) await api.delete(`/places/delete/${place.id}`);
    handleToggle();

    if (redirect) history.goBack();
  }, [removeCity, handleToggle, history, redirect, place, city]);

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

          {city && (
            <>
              <h1>Excluir cidade</h1>
              <span>
                Tem certeza que quer excluir a cidade de {city.name} e os seus{" "}
                {city.locals} locais?
              </span>
            </>
          )}
          {place && (
            <>
              <h1>Excluir local</h1>
              <span>
                Tem certeza que quer excluir o local {place.place_name}?
              </span>
            </>
          )}

          <div>
            <button onClick={handleToggle}>Não</button>
            <button onClick={() => handleRomove()}>Sim</button>
          </div>
        </Content>
      </Dialog>
    </Container>
  );
};

export default ModalRemove;
