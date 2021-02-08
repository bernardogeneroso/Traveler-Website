import React from "react";

import { AuthProvider } from "./Auth";
import { ToastProvider } from "./Toast";
import { CitiesProvider } from "./CitiesManager";

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <CitiesProvider>{children}</CitiesProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
