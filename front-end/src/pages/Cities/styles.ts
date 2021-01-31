import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;

  background: #f5f8fa;
`;

export const ContainerContent = styled.div`
  height: calc(100% - 96px);
  max-width: 1120px;
  margin: 0 auto;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding-top: 26px;

  h1 {
    font-weight: 600;
    font-size: 32px;
    color: #123952;
  }
`;

export const HeaderFilter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    color: #a0acb2;
    padding-left: 12px;
    padding-right: 12px;
    padding-bottom: 14px;
    border-bottom: 1px solid #dce2e5;
  }
`;
