import {GitHubReposResponse, Repository} from 'src/types/RepoTypes';
import githubApi from '../githubApi';

export const fetchUserRepos = async (
  username: string,
): Promise<GitHubReposResponse> => {
  try {
    const response = await githubApi.get<Repository[]>(
      `/users/${username}/repos`,
    );
    return response.data;
  } catch (error: any) {
    if (error.status === 404) {
      return {
        message: 'Nenhum repositório foi encontrado',
        status: error.response.status.toString(),
      };
    }
    throw new Error('Network error');
  }
};
