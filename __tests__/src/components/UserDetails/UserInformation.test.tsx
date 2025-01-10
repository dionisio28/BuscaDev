import React from 'react';
import {render, screen} from '@testing-library/react-native';
import UserInformation from '../../../../src/components/UserDetails/UserInformation';
import { GitHubUser } from '../../../../src/types/GitHubUserTypes';

describe('UserInformation Component', () => {
  const userMock = {
    id: 0,
    login: 'test_',
    name: 'Dionísio',
    bio: 'Dev',
    location: 'BR',
    email: 'dionisio@maltes.com',
    company: 'Test emprsa',
    avatar_url: 'https://avatars.githubusercontent.com/u/48914458?v=4',
    followers: 0,
    following: 0,
    public_repos: 0,
  };

  test('should render the name correctly', () => {
    render(<UserInformation user={userMock} />);

    const nameElement = screen.getByTestId('user-information-name');
    expect(nameElement).toHaveTextContent(userMock.name);
  });

  test('should render the bio correctly', () => {
    render(<UserInformation user={userMock} />);

    const bioElement = screen.getByTestId('user-information-bio');
    expect(bioElement).toHaveTextContent(userMock.bio);
  });

  test('should render the location correctly', () => {
    render(<UserInformation user={userMock} />);

    const locationElement = screen.getByTestId('user-information-location');
    expect(locationElement).toHaveTextContent(userMock.location);
  });

  test('should render the email correctly', () => {
    render(<UserInformation user={userMock} />);

    const emailElement = screen.getByTestId('user-information-mail');
    expect(emailElement).toHaveTextContent(userMock.email);
  });

  test('should render the company correctly', () => {
    render(<UserInformation user={userMock} />);

    const companyElement = screen.getByTestId('user-information-company');
    expect(companyElement).toHaveTextContent(userMock.company);
  });

  test('should render default text when properties are missing', () => {
    const incompleteUserMock = {} as GitHubUser;

    render(<UserInformation user={incompleteUserMock} />);

    expect(screen.getByTestId('user-information-name')).toHaveTextContent(
      'Nome não informado',
    );
    expect(screen.getByTestId('user-information-bio')).toHaveTextContent(
      'Este perfil não possui uma biografia.',
    );
    expect(screen.getByTestId('user-information-location')).toHaveTextContent(
      'Localização não informada',
    );
    expect(screen.getByTestId('user-information-mail')).toHaveTextContent(
      'Email não encontrado',
    );
    expect(screen.getByTestId('user-information-company')).toHaveTextContent(
      'Empresa não informada',
    );
  });
});
