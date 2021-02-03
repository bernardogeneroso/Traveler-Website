import React, { useState } from "react";
import { StaticContext } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";
import { getDay } from "date-fns";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import Header from "../../components/Main/Header";
import { PlaceProps } from "../City";
import { CityProps } from "../Cities";

import {
  Container,
  ContainerPlaceInformation,
  StructurePlaceInformation,
  PlaceBackground,
  ContainerStructurePlaceInformation,
  ContentPlaceInformation,
  ContainerShecdulesPlace,
  StructureShecdulesPlace,
  ContentShecdulesPlace,
  ContainerPlaceContact,
  ContainerPlaceMaps,
  ContainerStructurePlaceMaps,
  ContentPlaceMaps,
} from "./styles";

type LocationState = {
  placeInformation: PlaceProps;
  cityInformation: CityProps;
};

const Place = (
  props: RouteComponentProps<{}, StaticContext, LocationState>
) => {
  const [place] = useState(props.location.state.placeInformation);
  const [scheduleChoice] = useState<number>(() => {
    const dateNow = new Date();
    const dayOfWeek = getDay(dateNow);

    return dayOfWeek + 1;
  });

  return (
    <Container>
      <ContainerPlaceInformation>
        <StructurePlaceInformation>
          <Header
            lastPage={`city/${props.location.state.cityInformation.name}`}
            cityInformation={props.location.state.cityInformation}
          />

          <ContainerStructurePlaceInformation>
            <ContentPlaceInformation>
              <h1>{place.name}</h1>

              <p>{place.description}</p>

              <StructureShecdulesPlace>
                <h2>Atendimento</h2>
                <hr />
                <ContainerShecdulesPlace>
                  <ContentShecdulesPlace
                    className={scheduleChoice === 1 ? "focus" : ""}
                  >
                    <span>Domingo</span>
                    <div>Fechado</div>
                  </ContentShecdulesPlace>
                  <ContentShecdulesPlace
                    className={scheduleChoice === 2 ? "focus" : ""}
                  >
                    <span>Segunda</span>
                    <div>8h - 19h</div>
                  </ContentShecdulesPlace>
                  <ContentShecdulesPlace
                    className={scheduleChoice === 3 ? "focus" : ""}
                  >
                    <span>Terça</span>
                    <div>8h - 19h</div>
                  </ContentShecdulesPlace>
                  <ContentShecdulesPlace
                    className={scheduleChoice === 4 ? "focus" : ""}
                  >
                    <span>Quarta</span>
                    <div>8h - 19h</div>
                  </ContentShecdulesPlace>
                  <ContentShecdulesPlace
                    className={scheduleChoice === 5 ? "focus" : ""}
                  >
                    <span>Quinta</span>
                    <div>8h - 19h</div>
                  </ContentShecdulesPlace>
                  <ContentShecdulesPlace
                    className={scheduleChoice === 6 ? "focus" : ""}
                  >
                    <span>Sexta</span>
                    <div>8h - 19h</div>
                  </ContentShecdulesPlace>
                  <ContentShecdulesPlace
                    className={scheduleChoice === 7 ? "focus" : ""}
                  >
                    <span>Sábado</span>
                    <div>8h - 17h</div>
                  </ContentShecdulesPlace>
                </ContainerShecdulesPlace>
              </StructureShecdulesPlace>

              {place.phone_number && (
                <ContainerPlaceContact>
                  <button>
                    <IoLogoWhatsapp
                      size={22}
                      color="#438846"
                      style={{ zIndex: 9 }}
                    />
                    Entrar em contacto<div></div>
                  </button>

                  <div>
                    Telefone
                    <span>{place.phone_number}</span>
                  </div>
                </ContainerPlaceContact>
              )}

              <ContainerPlaceMaps>
                <ContainerStructurePlaceMaps>
                  <h2>Endereço</h2>

                  <span>Ver no Google Maps</span>
                </ContainerStructurePlaceMaps>
                <hr />

                <ContentPlaceMaps>
                  <div>
                    <MapContainer
                      center={[47.254, -0.09]}
                      zoom={6}
                      scrollWheelZoom={false}
                    >
                      <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                    </MapContainer>
                  </div>
                </ContentPlaceMaps>
              </ContainerPlaceMaps>
            </ContentPlaceInformation>
          </ContainerStructurePlaceInformation>
        </StructurePlaceInformation>

        <PlaceBackground image={place.image} />
      </ContainerPlaceInformation>
    </Container>
  );
};

export default Place;
