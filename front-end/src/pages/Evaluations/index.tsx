import React, { useState, useCallback } from "react";
import { BsQuestion } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { HiCheck } from "react-icons/hi";
import { CgSpinnerTwo } from "react-icons/cg";
import { AiOutlineClose, AiFillStar } from "react-icons/ai";

import HeaderAdmin from "../../components/Main/HeaderAdmin";
import MenuAdmin from "../../components/Main/MenuAdmin";
import { useEvaluations } from "../../hooks/EvaluationsManager";

import {
  Container,
  ContainerContent,
  ContainerEvaluations,
  ContentEvaluations,
  ContainerModalEvaluations,
  DialogModalEvaluations,
  ContentModalApprovalsEvaluations,
  ContentModalSeeEvaluations,
  ContentShowRating,
} from "./styles";

import {
  ContainerLoading,
  DialogLoading,
  Loadbar,
  Spinner,
} from "../Cities/styles";
import { FiTrash } from "react-icons/fi";

export interface EvaluationProps {
  id: string;
  name: string;
  avatar: string;
  description: string;
  rating: number;
  approved: number;
  place_name: string;
  city_name: string;
  categorie_name: string;
  place_id: string;
  created_at: string;
  updated_at: string;
}

interface ModalEvaluations {
  toggle: boolean;
  evaluation?: EvaluationProps;
}

const Evaluations: React.FC = () => {
  const { loading, evaluations, handleRemoveEvaluation } = useEvaluations();
  const [
    modalApprovalsEvaluations,
    setModalApprovalsEvaluations,
  ] = useState<ModalEvaluations>({
    toggle: false,
  });
  const [
    modalSeeEvaluations,
    setModalSeeEvaluations,
  ] = useState<ModalEvaluations>({
    toggle: false,
  });

  const handleToggleModalApprovalsEvaluations = useCallback(() => {
    setModalApprovalsEvaluations((state) => ({
      toggle: !state.toggle,
    }));
  }, []);

  const handleModalApprovalsEvaluationsAddEvaluation = useCallback(
    (evaluation: EvaluationProps) => {
      setModalApprovalsEvaluations((state) => ({
        ...state,
        evaluation,
      }));
    },
    []
  );

  const handleToggleModalSeeEvaluations = useCallback(() => {
    setModalSeeEvaluations((state) => ({
      toggle: !state.toggle,
    }));
  }, []);

  const handleModalSeeEvaluationsAddEvaluation = useCallback(
    (evaluation: EvaluationProps) => {
      setModalSeeEvaluations((state) => ({
        ...state,
        evaluation,
      }));
    },
    []
  );

  return (
    <>
      {loading ? (
        <ContainerLoading>
          <DialogLoading>
            <Loadbar>
              <Spinner>
                <CgSpinnerTwo size={48} color="#fff" />
              </Spinner>
            </Loadbar>
          </DialogLoading>
        </ContainerLoading>
      ) : (
        <>
          <Container
            blurOption={
              modalApprovalsEvaluations.toggle || modalSeeEvaluations.toggle
                ? true
                : false
            }
          >
            <HeaderAdmin cityName="Comentários" evaluationFilter />
            <MenuAdmin optionSelectedMenu={3} />

            <ContainerContent>
              <ContainerEvaluations>
                {evaluations &&
                  evaluations.map((evaluation: EvaluationProps) => (
                    <ContentEvaluations
                      key={evaluation.id}
                      approved={evaluation.approved}
                      onClick={() => {
                        if (evaluation.approved === 0) {
                          handleToggleModalApprovalsEvaluations();
                          handleModalApprovalsEvaluationsAddEvaluation(
                            evaluation
                          );
                        } else {
                          handleToggleModalSeeEvaluations();
                          handleModalSeeEvaluationsAddEvaluation(evaluation);
                        }
                      }}
                    >
                      <div className="format">
                        <div className="user-info">
                          <img
                            src={`${process.env.REACT_APP_API_URL}/evaluations/image-avatar/${evaluation.avatar}`}
                            alt={evaluation.name}
                          />
                          <h2>{evaluation.name}</h2>
                        </div>
                        <div className="evaluation-data">
                          <div className="status">
                            {evaluation.approved === 0 ? (
                              <BsQuestion size={24} color="#A0ACB3" />
                            ) : evaluation.approved === 1 ? (
                              <HiCheck size={20} color="#51B853" />
                            ) : (
                              <IoClose size={16} color="#DE3838" />
                            )}
                          </div>

                          <div className="topic-info">
                            <span>Categoria</span>
                            <h3>{evaluation.categorie_name}</h3>
                          </div>
                          <div className="topic-info">
                            <span>Cidade</span>
                            <h3>{evaluation.city_name}</h3>
                          </div>
                          <div className="topic-info">
                            <span>Local</span>
                            <h3>{evaluation.place_name}</h3>
                          </div>

                          <IoIosArrowForward size={24} color="#A0ACB3" />
                        </div>
                        {evaluation.approved === 0 && (
                          <div className="new-evaluation">
                            <span>Novo</span>
                          </div>
                        )}
                      </div>
                    </ContentEvaluations>
                  ))}
              </ContainerEvaluations>
            </ContainerContent>
          </Container>

          {modalApprovalsEvaluations.toggle && (
            <ContainerModalEvaluations>
              <DialogModalEvaluations>
                <ContentModalApprovalsEvaluations>
                  <header>
                    <h2>Nota {modalApprovalsEvaluations.evaluation?.rating}</h2>

                    <div onClick={handleToggleModalApprovalsEvaluations}>
                      <AiOutlineClose size={22} color="#A0ACB2" />
                    </div>
                  </header>
                  <div className="content">
                    <div className="left">
                      <img
                        src={`${process.env.REACT_APP_API_URL}/evaluations/image-avatar/${modalApprovalsEvaluations.evaluation?.avatar}`}
                        alt={modalApprovalsEvaluations.evaluation?.name}
                      />
                    </div>
                    <div className="right">
                      <h3>{modalApprovalsEvaluations.evaluation?.name}</h3>
                      <p>{modalApprovalsEvaluations.evaluation?.description}</p>

                      <div className="rating-present">
                        {[1, 2, 3, 4, 5].map((value: number) => (
                          <ContentShowRating
                            checked={
                              modalApprovalsEvaluations.evaluation?.rating &&
                              modalApprovalsEvaluations.evaluation?.rating >=
                                value
                                ? true
                                : false
                            }
                          >
                            <AiFillStar
                              size={22}
                              color={
                                modalApprovalsEvaluations.evaluation?.rating &&
                                modalApprovalsEvaluations.evaluation?.rating >=
                                  value
                                  ? "#F25D27"
                                  : "#A0ACB2"
                              }
                              key={value}
                            />
                          </ContentShowRating>
                        ))}
                      </div>

                      <div className="information">
                        <div className="topic-info">
                          <span>Categoria</span>
                          <h3>
                            {
                              modalApprovalsEvaluations.evaluation
                                ?.categorie_name
                            }
                          </h3>
                        </div>
                        <div className="topic-info">
                          <span>Cidade</span>
                          <h3>
                            {modalApprovalsEvaluations.evaluation?.city_name}
                          </h3>
                        </div>
                        <div className="topic-info">
                          <span>Local</span>
                          <h3>
                            {modalApprovalsEvaluations.evaluation?.place_name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <footer>
                    <button className="refuse">Recusar</button>
                    <button className="accept">Aceitar</button>
                  </footer>
                </ContentModalApprovalsEvaluations>
              </DialogModalEvaluations>
            </ContainerModalEvaluations>
          )}

          {modalSeeEvaluations.toggle && (
            <ContainerModalEvaluations>
              <DialogModalEvaluations>
                <ContentModalSeeEvaluations
                  approved={modalSeeEvaluations.evaluation?.approved}
                >
                  <header>
                    <div className="status-rating">
                      <h2>Nota {modalSeeEvaluations.evaluation?.rating}</h2>

                      <div className="status">
                        {modalSeeEvaluations.evaluation?.approved === 1 ? (
                          <HiCheck size={20} color="#51B853" />
                        ) : (
                          <IoClose size={16} color="#DE3838" />
                        )}
                      </div>
                    </div>

                    <div className="modal-actions">
                      <button
                        onClick={() => {
                          handleRemoveEvaluation(
                            modalSeeEvaluations.evaluation?.id as string
                          );
                          handleToggleModalSeeEvaluations();
                        }}
                      >
                        <FiTrash size={20} color="#DE3838" />
                        Excluir
                      </button>

                      <div onClick={handleToggleModalSeeEvaluations}>
                        <AiOutlineClose size={22} color="#A0ACB2" />
                      </div>
                    </div>
                  </header>
                  <div className="content">
                    <div className="left">
                      <img
                        src={`${process.env.REACT_APP_API_URL}/evaluations/image-avatar/${modalSeeEvaluations.evaluation?.avatar}`}
                        alt={modalSeeEvaluations.evaluation?.name}
                      />
                    </div>
                    <div className="right">
                      <h3>{modalSeeEvaluations.evaluation?.name}</h3>
                      <p>{modalSeeEvaluations.evaluation?.description}</p>

                      <div className="rating-present">
                        {[1, 2, 3, 4, 5].map((value: number) => (
                          <ContentShowRating
                            checked={
                              modalSeeEvaluations.evaluation?.rating &&
                              modalSeeEvaluations.evaluation?.rating >= value
                                ? true
                                : false
                            }
                          >
                            <AiFillStar
                              size={22}
                              color={
                                modalSeeEvaluations.evaluation?.rating &&
                                modalSeeEvaluations.evaluation?.rating >= value
                                  ? "#F25D27"
                                  : "#A0ACB2"
                              }
                              key={value}
                            />
                          </ContentShowRating>
                        ))}
                      </div>

                      <div className="information">
                        <div className="topic-info">
                          <span>Categoria</span>
                          <h3>
                            {modalSeeEvaluations.evaluation?.categorie_name}
                          </h3>
                        </div>
                        <div className="topic-info">
                          <span>Cidade</span>
                          <h3>{modalSeeEvaluations.evaluation?.city_name}</h3>
                        </div>
                        <div className="topic-info">
                          <span>Local</span>
                          <h3>{modalSeeEvaluations.evaluation?.place_name}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </ContentModalSeeEvaluations>
              </DialogModalEvaluations>
            </ContainerModalEvaluations>
          )}
        </>
      )}
    </>
  );
};

export default Evaluations;
