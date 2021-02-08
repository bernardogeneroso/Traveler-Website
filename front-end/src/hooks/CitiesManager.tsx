import React, {
  createContext,
  useEffect,
  useCallback,
  useState,
  useContext,
} from "react";
import api from "../services/api";

import { CityProps } from "../pages/Cities";

interface CitiesManagerData {
  cities: CityProps[];
  searchCities: string;
  filterOption: number;
  loading: boolean;
  filterOptions(option: number): void;
  searchFilter(event: React.FormEvent<HTMLInputElement>): void;
  cleanSearchFilter(): void;
}

const CitiesManager = createContext<CitiesManagerData>({} as CitiesManagerData);

const CitiesProvider: React.FC = ({ children }) => {
  const [cities, setCities] = useState<CityProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterOption, setFilterOption] = useState<number>(() => {
    const filterOptionStorage = localStorage.getItem("Traveler:filterOption");

    if (filterOptionStorage) {
      const filterOptionParse = JSON.parse(filterOptionStorage);
      if (filterOptionParse === 3) {
        return 1;
      }
      return filterOptionParse;
    }
    return 1;
  });
  const [searchCities, setSearchFilter] = useState<string>("");

  useEffect(() => {
    api.get("/cities").then((response) => {
      setCities(response.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("Traveler:filterOption", JSON.stringify(filterOption));
  }, [filterOption]);

  const filterOptions = useCallback(
    (option: number) => {
      if (option === filterOption) return;
      if (filterOption === 3 && cities !== null) cities.reverse();

      setFilterOption(option);

      if (option === 3 && cities !== null) {
        cities.reverse();
      }
    },
    [cities, filterOption]
  );

  const searchFilter = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const search = event.target.value;

      setSearchFilter(search);

      if (search !== "") {
        const { data } = await api.get(`/cities/?search=${search}`);

        const filterCitiesExist = data.filter(
          (city: CityProps) => city.opacity === 1
        );
        const filterCitiesNotExist = data.filter(
          (city: CityProps) => city.opacity === 0
        );

        let citiesResponse = filterCitiesExist.concat(filterCitiesNotExist);

        if (data.length === filterCitiesNotExist.length) {
          citiesResponse = null;
        } else if (filterOption === 3) {
          citiesResponse.reverse();
        }

        setCities(citiesResponse);
      } else {
        const { data } = await api.get(`/cities`);
        setFilterOption(1);
        setCities(data);
      }
    },
    [filterOption]
  );

  const cleanSearchFilter = useCallback(async () => {
    setSearchFilter("");

    const { data } = await api.get(`/cities`);
    setFilterOption(1);
    setCities(data);
  }, []);

  return (
    <CitiesManager.Provider
      value={{
        cities,
        searchCities,
        filterOption,
        loading,
        filterOptions,
        searchFilter,
        cleanSearchFilter,
      }}
    >
      {children}
    </CitiesManager.Provider>
  );
};

function useCities(): CitiesManagerData {
  const context = useContext(CitiesManager);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { CitiesProvider, useCities };
