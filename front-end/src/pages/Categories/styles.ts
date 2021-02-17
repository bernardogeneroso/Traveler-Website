import { shade } from "polished";
import styled from "styled-components";

interface ContentCategoriesProps {
  noContent: boolean;
}

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  background: #f5f8fa;
`;

export const ContainerContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`;

export const ContainerCategories = styled.div`
  margin-top: 30px;
  width: calc(100% + 30px);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  place-content: center;
`;

export const ContentCategories = styled.div<ContentCategoriesProps>`
  height: 618px;
  width: 352px;
  background: ${(props) =>
    props.noContent ? "rgba(255, 255, 255, 0.7)" : "#fff"};
  border-radius: 20px;
  border: ${(props) =>
    props.noContent ? "2px dashed #DCE2E6" : "1px solid #dce2e6"};
  margin-right: 30px;
  margin-bottom: 20px;

  .footer {
    padding: 24px 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    border-bottom: 1px solid #dce2e6;

    .menu,
    .edit,
    .trash {
      cursor: pointer;
    }

    .menu {
      width: 40px;
      height: 40px;
      border: 1px solid #dce2e5;
      background: #fff;
      border-radius: 10px;

      display: flex;
      place-content: center;
      align-items: center;

      &:hover {
        background: ${shade(0.06, "#fff")};
      }
    }

    .actions {
      display: flex;
      flex-direction: row;

      .edit:hover,
      .trash:hover {
        background: ${shade(0.06, "#fff")};
      }

      .edit {
        width: 40px;
        height: 40px;
        border: 1px solid #dce2e5;
        background: #fff;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;

        display: flex;
        place-content: center;
        align-items: center;
      }

      .trash {
        width: 40px;
        height: 40px;
        border: 1px solid #dce2e5;
        background: #fff;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        margin-left: 10px;

        display: flex;
        place-content: center;
        align-items: center;
      }
    }
  }

  .content {
    padding: 24px 40px;
    height: calc(100% - 89px);
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    h1 {
      color: #123952;
      font-weight: 600;
      font-size: 48px;
    }

    span {
      color: #617480;
      font-weight: 400;
      font-size: 20px;
    }
  }

  .add-categorie {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    cursor: pointer;

    transition: all ease 0.2s;

    &:hover {
      background: ${shade(0.03, "#fff")};
    }
  }
`;
