import React, { useState, useCallback, useEffect } from "react";
import { FiEdit, FiInfo, FiMenu, FiPlus, FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";
import { v4 } from "uuid";

import HeaderAdmin from "../../components/Main/HeaderAdmin";
import MenuAdmin from "../../components/Main/MenuAdmin";
import Icon from "../../components/Icon";
import api from "../../services/api";
import { useToast } from "../../hooks/Toast";
import { CategoriesProps } from "../City";

import {
  Container,
  ContainerContent,
  ContainerCategories,
  ContentCategories,
} from "./styles";

import {
  Container as ContainerModalRemoveCategorie,
  Dialog as DialogModalRemoveCategorie,
  Content as ContentModalRemoveCategorie,
  ContainerShow as ContainerShowModalRemoveCategorie,
} from "../../components/Main/ModalRemove/styles";

import vector from "../../assets/modalremovecity/vector.png";
import vector1 from "../../assets/modalremovecity/vector1.png";
import vector2 from "../../assets/modalremovecity/vector2.png";
import trash from "../../assets/modalremovecity/trash.png";

interface ModalRemoveProps {
  toggle: boolean;
  categorie?: CategoriesProps;
}

const Categories: React.FC = () => {
  const { addToast } = useToast();

  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [
    modalRemoveCategorie,
    setModalRemovePlace,
  ] = useState<ModalRemoveProps>({
    toggle: false,
  });

  useEffect(() => {
    api.get("/categories").then(({ data }) => {
      let allCategories = data;

      if (allCategories.length < 3) {
        for (let i = 0; i < 3; i++) {
          if (!allCategories[i]) {
            allCategories.push({
              id: v4(),
              name: undefined,
              iconName: undefined,
              places: undefined,
              created_at: undefined,
              updated_at: undefined,
            });
          }
        }
      }

      setCategories(allCategories);
    });
  }, []);

  const handleSetModalRemoveCategorieID = useCallback(
    (categorie: CategoriesProps) => {
      setModalRemovePlace({
        toggle: true,
        categorie,
      });
    },
    []
  );

  const handleToggleRemoveModal = useCallback(() => {
    setModalRemovePlace((state) => ({
      ...state,
      toggle: !state.toggle,
    }));
  }, []);

  const handleRemoveCategorie = useCallback(async () => {
    try {
      await api.delete(
        `/categories/delete/${modalRemoveCategorie.categorie?.id}`
      );

      setCategories((state) => {
        let allCategories = state.filter(
          (categorieNow) =>
            categorieNow.id !== modalRemoveCategorie.categorie?.id
        );

        for (let i = 0; i < 3; i++) {
          if (!allCategories[i]) {
            allCategories.push({
              id: v4(),
              name: undefined,
              iconName: undefined,
              created_at: undefined,
              updated_at: undefined,
            });
          }
        }

        return allCategories;
      });

      handleToggleRemoveModal();

      addToast({
        title: "Categoria apagada com sucesso",
        description: `A categoria ${modalRemoveCategorie.categorie?.name} foi apagada com sucesso!`,
        type: "success",
      });
    } catch (err) {
      addToast({
        title: "Error ao apagar a categoria",
        description: err.response.data.message,
        type: "error",
      });
    }
  }, [
    addToast,
    modalRemoveCategorie.categorie?.id,
    modalRemoveCategorie.categorie?.name,
    handleToggleRemoveModal,
  ]);

  return (
    <Container>
      <HeaderAdmin
        cityName="Categorias"
        MiddleContent={{
          message: "Você pode adicionar apenas três",
          Icon: FiInfo,
        }}
        buttonPosition="categories"
      />
      <MenuAdmin optionSelectedMenu={2} />

      <ContainerContent>
        <ContainerCategories>
          {categories.map((categorie: CategoriesProps) =>
            categorie.name ? (
              <ContentCategories key={categorie.id} noContent={false}>
                <div className="footer">
                  <div className="menu">
                    <FiMenu color="#617480" />
                  </div>

                  <div className="actions">
                    <Link to={`/categories/edit/${categorie.id}`}>
                      <div className="edit">
                        <FiEdit color="#617480" />
                      </div>
                    </Link>
                    <div
                      className="trash"
                      onClick={() => handleSetModalRemoveCategorieID(categorie)}
                    >
                      <FiTrash color="#617480" />
                    </div>
                  </div>
                </div>
                <div className="content">
                  <Icon
                    iconName={categorie.iconName}
                    size={64}
                    color="#F25D27"
                  />

                  <h1>{categorie.name}</h1>

                  <span>1.198 locais</span>
                </div>
              </ContentCategories>
            ) : (
              <ContentCategories key={categorie.id} noContent={true}>
                <Link to="/categories/create">
                  <div className="add-categorie">
                    <FiPlus color="#F25D27" />
                  </div>
                </Link>
              </ContentCategories>
            )
          )}
        </ContainerCategories>
      </ContainerContent>

      {modalRemoveCategorie.toggle && (
        <ContainerModalRemoveCategorie>
          <DialogModalRemoveCategorie>
            <ContentModalRemoveCategorie>
              <ContainerShowModalRemoveCategorie>
                <img src={vector} alt="Vector 1" />
                <img src={vector1} alt="Vector 2" />
                <img src={vector2} alt="Vector 3" />
                <img src={trash} alt="Trash" />
              </ContainerShowModalRemoveCategorie>

              <h1>Excluir categoria</h1>
              <span>
                Tem certeza que quer excluir a categoria{" "}
                {modalRemoveCategorie.categorie?.name} e os seus 1.198 loacis?
              </span>

              <div>
                <button onClick={handleToggleRemoveModal}>Não</button>
                <button onClick={() => handleRemoveCategorie()}>Sim</button>
              </div>
            </ContentModalRemoveCategorie>
          </DialogModalRemoveCategorie>
        </ContainerModalRemoveCategorie>
      )}
    </Container>
  );
};

export default Categories;
