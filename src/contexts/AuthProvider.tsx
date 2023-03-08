import Error403 from '@components/403';
import LoadingScreen from '@components/loading/LoadingScreen';
import ROUTE from '@constants/route';
import { PayloadEncryptor } from '@cores/api/payload-encrypt';
import { authAPI } from '@services/api';
import { AuthData } from '@services/models/auth';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { authDataAtom, authTokenAtom, selectedMenuKeyAtom } from 'state';

interface AuthContextValues {
  isAuthenticated: boolean;
  authData: AuthData | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const initialState: AuthContextValues = {
  isAuthenticated: false,
  authData: null,
  loading: false,
  login: (_username: string, _password: string): Promise<void> => {
    throw new Error('Function not implemented.');
  },
  logout: (): void => {
    throw new Error('Function not implemented.');
  },
};

const AuthContext = createContext(initialState);

type AuthProviderProps = {
  children?: React.ReactNode;
};
export const AuthProvider = (props: AuthProviderProps): JSX.Element => {
  const [token, setAuthToken] = useAtom(authTokenAtom);
  const [authData, setAuthData] = useAtom(authDataAtom);

  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function loadAuthToken() {
      if (
        typeof window !== 'undefined' &&
        window.location.pathname !== ROUTE.HOME
      ) {
        if (token) {
          try {
            const resp = await authAPI.getMe();
            setAuthToken(token);
            setAuthData(resp.data);
          } catch (error) {
            window.location.href = ROUTE.HOME;
          }
        } else {
          window.location.href = ROUTE.HOME;
        }
      }
      setLoading(false);
    }
    loadAuthToken();
  }, [setAuthData, setAuthToken, token]);

  const login = async (username: string, password: string) => {
    const resp = await authAPI.login({
      username,
      password: PayloadEncryptor.encrypt(password),
    });
    setAuthToken(resp.data.token.accessToken);
    setAuthData(resp.data);
  };

  const logout = () => {
    router.replace(ROUTE.HOME);
    // TODO optimize token, authData
    localStorage.removeItem('token');
    localStorage.removeItem('authData');
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!authData, authData, loading, login, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

type ProtectRouteProps = {
  // children?: React.ReactNode & {
  //   props: CustomStaticPageProps;
  // };
  //TODO handle any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
};
export const ProtectRoute = ({ children }: ProtectRouteProps) => {
  const { isAuthenticated, loading, authData } = useAuth();
  const [, setSelectedMenuKey] = useAtom(selectedMenuKeyAtom);

  useEffect(() => {
    setSelectedMenuKey([children?.props.code]);
  }, [children?.props.code, setSelectedMenuKey]);

  if (loading) {
    return <LoadingScreen />;
  } else {
    if (!children?.props.protected) {
      return children;
    } else if (
      isAuthenticated &&
      children?.props.roles?.some((e: string) => authData?.roles.includes(e))
    ) {
      return children;
    } else {
      return <Error403 />;
    }
  }
};
