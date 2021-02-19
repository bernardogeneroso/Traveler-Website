import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import api from "../services/api";

import { EvaluationProps } from "../pages/Evaluations";
import { useToast } from "./Toast";

interface EvaluationsManagerData {
  evaluations: EvaluationProps[] | undefined;
  loading: boolean;
  filterOption: number;
  handleFilterOptions(option: number): void;
  handleRemoveEvaluation(id: string): void;
}

const EvaluationsManager = createContext<EvaluationsManagerData>(
  {} as EvaluationsManagerData
);

const EvaluationsProvider: React.FC = ({ children }) => {
  const { addToast } = useToast();

  const [evaluations, setEvaluations] = useState<EvaluationProps[] | undefined>(
    undefined
  );
  const [filterOption, setFilterOption] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api.get("/evaluations/all").then(({ data }) => {
      setEvaluations(data);
      setLoading(false);
    });
  }, []);

  const handleFilterOptions = useCallback(
    (option: number) => {
      if (option === filterOption) return;

      setFilterOption(option);
      setLoading(true);

      if (option === 1) {
        api.get("/evaluations/all").then(({ data }) => {
          setEvaluations(data);
          setLoading(false);
        });
      } else if (option === 2) {
        api.get("/evaluations/recent").then(({ data }) => {
          setEvaluations(data);
          setLoading(false);
        });
      } else if (option === 3) {
        api.get("/evaluations/old").then(({ data }) => {
          setEvaluations(data);
          setLoading(false);
        });
      } else if (option === 4) {
        api.get("/evaluations/accepted").then(({ data }) => {
          setEvaluations(data);
          setLoading(false);
        });
      } else if (option === 5) {
        api.get("/evaluations/refused").then(({ data }) => {
          setEvaluations(data);
          setLoading(false);
        });
      }
    },
    [filterOption]
  );

  const handleRemoveEvaluation = useCallback(
    async (id: string | undefined) => {
      if (!id) return;

      setLoading(true);

      try {
        await api.delete(`/evaluations/delete/${id}`);

        setEvaluations((state) => {
          if (!state) return undefined;

          const filterRemoveEvaluation = state.filter(
            (evaluation: EvaluationProps) => evaluation.id !== id
          );

          return filterRemoveEvaluation;
        });

        addToast({
          title: "Avaliação eliminida com sucesso",
          type: "success",
        });
      } catch (err) {
        addToast({
          title: "Erro ao eliminar a avaliação",
          description: err.response.data.message,
          type: "error",
        });
      }

      setLoading(false);
    },
    [addToast]
  );

  return (
    <EvaluationsManager.Provider
      value={{
        evaluations,
        loading,
        filterOption,
        handleFilterOptions,
        handleRemoveEvaluation,
      }}
    >
      {children}
    </EvaluationsManager.Provider>
  );
};

function useEvaluations(): EvaluationsManagerData {
  const context = useContext(EvaluationsManager);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { EvaluationsProvider, useEvaluations };
