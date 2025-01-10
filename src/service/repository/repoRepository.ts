import {GitHubReposResponse, Repository} from 'src/types/RepoTypes';
import githubApi from '../githubApi';

export const fetchUserRepos = async (
  username: string,
  page: number,
): Promise<GitHubReposResponse> => {
  try {
    const response = await githubApi.get<Repository[]>(
      `/users/${username}/repos?per_page=8&page=${page}&sort=created`,
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
