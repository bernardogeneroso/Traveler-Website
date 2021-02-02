import React, { useState } from "react";
import { StaticContext } from "react-router";
import { RouteComponentProps } from "react-router-dom";

import Header from "../../components/Main/Header";
import { PlaceProps } from "../City";
import { CityProps } from "../Cities";

import { Container } from "./styles";

type LocationState = {
  placeInformation: PlaceProps;
  cityInformation: CityProps;
};

const Place = (
  props: RouteComponentProps<{}, StaticContext, LocationState>
) => {
  const [place] = useState(props.location.state.placeInformation);

  return (
    <Container>
      <Header
        lastPage={`city/${props.location.state.cityInformation.name}`}
        cityInformation={props.location.state.cityInformation}
      />
    </Container>
  );
};

export default Place;
