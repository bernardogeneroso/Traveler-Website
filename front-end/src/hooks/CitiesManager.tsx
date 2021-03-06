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
  addCity(city: CityProps): void;
  editCity(city: CityProps): void;
  removeCity(id: number): void;
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
        setLoading(true);
        const { data } = await api.get(`/cities/?search=${search}`);

        const filterCitiesExist = data.filter(
          (city: CityProps) => city.opacity
        );
        const filterCitiesNotExist = data.filter(
          (city: CityProps) => !city.opacity
        );

        let citiesResponse = filterCitiesExist.concat(filterCitiesNotExist);

        if (data.length === filterCitiesNotExist.length) {
          citiesResponse = null;
        } else if (filterOption === 3) {
          citiesResponse.reverse();
        }

        setCities(citiesResponse);
        setLoading(false);
      } else {
        setLoading(true);
        const { data } = await api.get(`/cities`);
        setFilterOption(1);
        setCities(data);
        setLoading(false);
      }
    },
    [filterOption]
  );

  const cleanSearchFilter = useCallback(async () => {
    setSearchFilter("");

    setLoading(true);
    const { data } = await api.get(`/cities`);
    setFilterOption(1);
    setCities(data);
    setLoading(false);
  }, []);

  const addCity = useCallback((city: CityProps) => {
    setCities((state) => [...state, city]);
  }, []);

  const editCity = useCallback((city: CityProps) => {
    setCities((state) => {
      const filter = state.map((cityData: CityProps) => {
        if (city.id === cityData.id) return city;

        return cityData;
      });

      return filter;
    });
  }, []);

  const removeCity = useCallback(async (id: number) => {
    setLoading(true);
    await api.delete(`/cities/delete/${id}`);

    setCities((state) => {
      const filter = state.filter((city: CityProps) => city.id !== id);

      return filter;
    });
    setLoading(false);
  }, []);

  return (
    <CitiesManager.Provider
      value={{
        cities,
        searchCities,
        filterOption,
        loading,
        addCity,
        editCity,
        removeCity,
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
