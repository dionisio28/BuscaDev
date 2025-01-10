import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {UserProvider} from '../../../src/contexts/UserContext';
import UserDetails from '../../../src/screens/UserDetails';
import {useUser} from '../../../src/hooks/useGitHub';
import {Repository} from '../../../src/types/RepoTypes';
import {GitHubUser} from '../../../src/types/GitHubUserTypes';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('../../../src/hooks/useGitHub', () => ({
  useUser: jest.fn(),
}));

const reposMock: Repository[] = [
  {
    id: 1,
    name: 'Repo 1',
    description: 'Description of Repo 1',
    language: 'JavaScript',
    stargazers_count: 1500,
    updated_at: '2022-01-01T00:00:00Z',
    html_url: 'https://github.com/repo1',
  },
  {
    id: 2,
    name: 'Repo 2',
    description: 'Description of Repo 2',
    language: 'TypeScript',
    stargazers_count: 2500,
    updated_at: '2022-02-01T00:00:00Z',
    html_url: 'https://github.com/repo2',
  },
];

const userMock: GitHubUser = {
  id: 1,
  login: 'test_',
  name: 'Dionísio',
  bio: 'Dev',
  location: 'BR',
  email: 'dionisio@maltes.com',
  company: 'Test emprsa',
  avatar_url: 'https://avatars.githubusercontent.com/u/48914458?v=4',
  followers: 23,
  following: 22,
  public_repos: 32,
};

const mockUserData = {
  user: userMock,
  repos: reposMock,
  getMoreRepos: jest.fn(),
};

const Wrapper = ({children}: {children: React.ReactNode}) => (
  <NavigationContainer>
    <UserProvider>{children}</UserProvider>
  </NavigationContainer>
);

describe('UserDetails Screen', () => {
  test('should render with data', async () => {
    (useUser as jest.Mock).mockReturnValue(mockUserData);
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({navigate: mockNavigate});

    render(
      <Wrapper>
        <UserDetails />
      </Wrapper>,
    );

    expect(screen.getByText('Dionísio')).toBeTruthy();

    reposMock.forEach(repo => {
      expect(screen.getByText(repo.name)).toBeTruthy();
      expect(screen.getByText(repo.description!!)).toBeTruthy();
    });
  });
});
