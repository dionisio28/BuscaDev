import githubApi from '../githubApi';
import {GitHubResponse, GitHubUser} from '../../types/GitHubUserTypes';

export const fetchUser = async (username: string): Promise<GitHubResponse> => {
  try {
    const response = await githubApi.get<GitHubUser>(`/users/${username}`);
    return response.data;
  } catch (error: any) {
    if (error.status === 404) {
      return {
        message: 'Usuário não encontrado',
        status: error.response.status.toString(),
      };
    }
    throw new Error('Network error');
  }
};
