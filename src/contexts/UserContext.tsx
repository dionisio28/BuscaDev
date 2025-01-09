import React, {createContext, useState, ReactNode} from 'react';
import {fetchUser} from '../service/repository/userRepository';
import {GitHubResponse} from '../types/GitHubUser';

interface UserContextState {
  user: GitHubResponse | null;
  loading: boolean;
  error: string | null;
  getUser: (username: string) => Promise<void>;
}

const initialState: UserContextState = {
  user: null,
  loading: false,
  error: null,
  getUser: async () => {},
};

export const UserContext = createContext<UserContextState>(initialState);

export const UserProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [user, setUser] = useState<GitHubResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUser = async (username: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchUser(username);
      if ('message' in response) {
        setError(response.message);
      } else {
        setUser(response);
      }
    } catch (err: any) {
      setError('Ocorreu um erro inesperado ao buscar o usuário.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{user, loading, error, getUser}}>
      {children}
    </UserContext.Provider>
  );
};
