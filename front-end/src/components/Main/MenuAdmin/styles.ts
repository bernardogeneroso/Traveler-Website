import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 96px;
  height: 100vh;
  background: #f25d27;
  z-index: 9;
`;

export const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  img {
    margin-top: 22px;
  }

  .power {
    cursor: pointer;
    margin-bottom: 22px;

    &:hover {
      color: ${shade(0.1, "#fff")};
    }
  }
`;

export const ContainerOptions = styled.div`
  display: flex;
  flex-direction: column;

  a {
    margin-bottom: 22px;
  }
`;
