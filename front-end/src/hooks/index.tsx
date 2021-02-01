import React from "react";

import { CitiesProvider } from "./CitiesManager";

const AppProvider: React.FC = ({ children }) => (
  <CitiesProvider>{children}</CitiesProvider>
);

export default AppProvider;
