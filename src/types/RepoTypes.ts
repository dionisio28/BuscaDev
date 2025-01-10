import {GitHubError} from './GitHubUserTypes';

export interface Repository {
  id: number;
  language: string | null;
  name: string;
  description: string | null;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
}

export type GitHubReposResponse = Repository[] | GitHubError;
