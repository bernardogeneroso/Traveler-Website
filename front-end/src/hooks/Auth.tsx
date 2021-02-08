import React, { createContext, useCallback, useState, useContext } from "react";
import api from "../services/api";

interface User {
  id: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials, save: boolean): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("Traveler:token");
    const user = localStorage.getItem("Traveler:user");

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }, save) => {
    const response = await api.post("/users/sessions", {
      email,
      password,
    });

    const { user, token } = response.data;

    localStorage.setItem("Traveler:token", token);
    localStorage.setItem("Traveler:user", JSON.stringify(user));

    if (save) {
      localStorage.setItem("Traveler:signin-form", JSON.stringify(true));
      localStorage.setItem("Traveler:signin-form-email", email);
      localStorage.setItem("Traveler:signin-form-password", password);
    } else {
      localStorage.removeItem("Traveler:signin-form");
      localStorage.removeItem("Traveler:signin-form-email");
      localStorage.removeItem("Traveler:signin-form-password");
    }

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("Traveler:token");
    localStorage.removeItem("Traveler:user");

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      setData({
        token: data.token,
        user,
      });

      localStorage.setItem("Traveler:user", JSON.stringify(user));
    },
    [setData, data.token]
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
