import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import RepositoryList from '../../../../src/components/UserDetails/RepositoryList';
import {Repository} from '../../../../src/types/RepoTypes';
import {Alert, Linking} from 'react-native';

jest.mock('../../../../src/hooks/useGitHub', () => ({
  useUser: () => ({loading: false}),
}));

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

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

describe('RepositoryList', () => {
  test('renders list of repositories', () => {
    render(<RepositoryList repos={reposMock} />);

    expect(screen.getByText('Repo 1')).toBeTruthy();
    expect(screen.getByText('Repo 2')).toBeTruthy();
  });

  test('should render the stargazers count with "K" suffix for large numbers', () => {
    render(<RepositoryList repos={reposMock} />);

    expect(screen.getByText('1.5K')).toBeTruthy();
    expect(screen.getByText('2.5K')).toBeTruthy();
  });

  test('opens repository URL when pressed', async () => {
    render(<RepositoryList repos={reposMock} />);

    const repo1Button = screen.getByText('Repo 1');
    fireEvent.press(repo1Button);

    expect(Linking.openURL).toHaveBeenCalledWith('https://github.com/repo1');
  });

  test('shows an alert when the repository URL is not found', async () => {
    const reposWithoutUrl = [
      {
        id: 3,
        name: 'Repo 3',
        description: 'Description of Repo 3',
        language: 'Ruby',
        stargazers_count: 100,
        updated_at: '2022-03-01T00:00:00Z',
        html_url: '',
      },
    ];

    render(<RepositoryList repos={reposWithoutUrl} />);

    const repo3Button = screen.getByText('Repo 3');
    fireEvent.press(repo3Button);

    expect(Alert.alert).toHaveBeenCalledWith(
      'Erro',
      'URL do repositório não encontrada.',
    );
  });
});
