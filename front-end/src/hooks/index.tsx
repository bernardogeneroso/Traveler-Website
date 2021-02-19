import React from "react";

import { AuthProvider } from "./Auth";
import { EvaluationsProvider } from "./EvaluationsManager";
import { ToastProvider } from "./Toast";
import { CitiesProvider } from "./CitiesManager";

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <CitiesProvider>
        <EvaluationsProvider>{children}</EvaluationsProvider>
      </CitiesProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
