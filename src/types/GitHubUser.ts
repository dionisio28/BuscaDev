export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name?: string;
  bio?: string;
  company?: string;
  email?: string;
  followers: number;
  following: number;
}

export interface GitHubError {
  message: string;
  status: string;
}

export type GitHubResponse = GitHubUser | GitHubError;
