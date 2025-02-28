import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import * as SecureStore from "expo-secure-store";
import { RootSiblingParent } from "react-native-root-siblings";
import IUser from "../interfaces/usersInterfaces";
import { Alert } from "../components/toast";

interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
    author: IUser | null;
  };
  onLogin: (email: string, password: string) => Promise<unknown>;
  onLogout?: () => Promise<unknown>;
}

export const TOKEN_KEY = "my-jwt-token";
export const AUTHOR_KEY = "author-data";
const AuthContext = createContext<AuthProps>({
  onLogin: async () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

async function saveSecureStore(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    author: IUser | null;
  }>({
    token: null,
    authenticated: null,
    author: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const authorString = await SecureStore.getItemAsync(AUTHOR_KEY);

      const author: IUser | null = authorString
        ? JSON.parse(authorString)
        : null;

      if (token) {
        setAuthState({
          token,
          author,
          authenticated: true,
        });
      }
    };

    loadToken();
  }, []);

  const generateToken = () => {
    return Math.random().toString(36).substring(2);
  };

  const login = async (email: string, password: string) => {
    console.log("Login chamado com:", email, password);
    try {
      const token = generateToken();
      const author = { id: token, email, password };


      await saveSecureStore(TOKEN_KEY, token);
      await saveSecureStore(AUTHOR_KEY, JSON.stringify(author));
      Alert("Seja-bem vindo, outra vez!", 1000);

      setAuthState({
        token,
        author,
        authenticated: true,
      });

      return { token, author };
    } catch (error) {
      return Alert("Falha ao acessar sua conta, Por favor tente mais tarde!");
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(AUTHOR_KEY);

    setAuthState({
      token: null,
      author: null,
      authenticated: false,
    });

    return Alert("Sessão terminada, até mais!");
  };

  const value = {
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return (
    <AuthContext.Provider value={value}>
      <RootSiblingParent>{children}</RootSiblingParent>
    </AuthContext.Provider>
  );
};
