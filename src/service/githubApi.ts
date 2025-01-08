import axios from 'axios';
import {GITHUB_TOKEN} from '@env';

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${GITHUB_TOKEN}`,
  },
});

export default githubApi;
