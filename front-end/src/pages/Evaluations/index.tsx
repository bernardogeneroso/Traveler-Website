import React, { useState, useEffect } from "react";
import { BsQuestion } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";

import HeaderAdmin from "../../components/Main/HeaderAdmin";
import MenuAdmin from "../../components/Main/MenuAdmin";
import api from "../../services/api";

import {
  Container,
  ContainerContent,
  ContainerEvaluations,
  ContentEvaluations,
} from "./styles";

interface EvaluationProps {
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

const Evaluations: React.FC = () => {
  const [evaluations, setEvaluations] = useState<EvaluationProps[] | undefined>(
    undefined
  );

  useEffect(() => {
    api.get("/evaluations/all").then(({ data }) => {
      setEvaluations(data);
    });
  }, []);

  return (
    <Container>
      <HeaderAdmin cityName="Comentários" evaluationFilter />
      <MenuAdmin optionSelectedMenu={3} />

      <ContainerContent>
        <ContainerEvaluations>
          {evaluations &&
            evaluations.map((evaluation: EvaluationProps) => (
              <ContentEvaluations key={evaluation.id}>
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
                      <BsQuestion size={24} color="#A0ACB3" />
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
                  <div className="new-evaluation">
                    <span>Novo</span>
                  </div>
                </div>
              </ContentEvaluations>
            ))}
        </ContainerEvaluations>
      </ContainerContent>
    </Container>
  );
};

export default Evaluations;
