import React, {createContext, useState, ReactNode, useCallback} from 'react';
import {fetchUser} from '../service/repository/userRepository';
import {GitHubUser} from '../types/GitHubUserTypes';
import {fetchUserRepos} from '../service/repository/repoRepository';
import {Repository} from '../types/RepoTypes';
interface UserContextState {
  user: GitHubUser;
  loading: boolean;
  error: string | null;
  typeError: 'error' | 'warning';
  getUser: (username: string, callbackNavigator: Function) => Promise<void>;
  clearError: () => void;
  repos: Repository[];
}

const initialState: UserContextState = {
  user: {} as GitHubUser,
  loading: false,
  error: null,
  typeError: 'error',
  getUser: async () => {},
  clearError: () => {},
  repos: [],
};

export const UserContext = createContext<UserContextState>(initialState);

export const UserProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [user, setUser] = useState<GitHubUser>({} as GitHubUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [typeError, setTypeError] = useState<'error' | 'warning'>('error');
  const [repos, setRepos] = useState<Repository[]>([]);

  const getUser = async (username: string, callbackNavigator: Function) => {
    if (loading) {
      return;
    }

    const validationResult = validateUsername(username);
    if (!validationResult.isValid) {
      setError(validationResult.message);
      setTypeError('warning');
      return;
    }

    setLoading(true);
    setError(null);
    setTypeError('error');

    try {
      const response = await fetchUser(username);
      if ('message' in response) {
        setError(response.message);
      } else {
        setUser(response);
        callbackNavigator();
        setTypeError('error');
        getRepos(username);
      }
    } catch (err: any) {
      setError('Ocorreu um erro inesperado ao buscar o usuário.');
      setTypeError('error');
    } finally {
      setLoading(false);
    }
  };

  const getRepos = async (username: string) => {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      const response = await fetchUserRepos(username);
      if ('message' in response) {
        setError(response.message);
      } else {
        setRepos(response);
      }
    } catch (err: any) {
      setError('Ocorreu um erro inesperado ao buscar o usuário.');
      setTypeError('error');
    } finally {
      setLoading(false);
    }
  };

  const validateUsername = (username: string) => {
    if (!username) {
      return {
        isValid: false,
        message: 'Insira o nome de usuário para fazer a pesquisa',
      };
    }

    if (username.length < 1 || username.length > 39) {
      return {
        isValid: false,
        message: 'O nome de usuário deve ter entre 1 e 39 caracteres',
      };
    }

    const regex = /^(?!-)[A-Za-z0-9_-]+(?<!-)$/;
    if (!regex.test(username)) {
      return {
        isValid: false,
        message:
          'O nome de usuário só pode conter letras, números, hífens e sublinhados, e não pode começar ou terminar com hífen.',
      };
    }

    return {isValid: true, message: ''};
  };

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <UserContext.Provider
      value={{user, loading, error, getUser, typeError, clearError, repos}}>
      {children}
    </UserContext.Provider>
  );
};
