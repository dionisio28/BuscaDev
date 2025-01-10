import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import {UserProvider} from '../../../src/contexts/UserContext';
import SearchUser from '../../../src/screens/SearchUser';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

const Wrapper = ({children}: {children: React.ReactNode}) => (
  <NavigationContainer>
    <UserProvider>{children}</UserProvider>
  </NavigationContainer>
);

describe('SearchUser Screen', () => {
  test('should navigate when user is found', async () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({navigate: mockNavigate});

    render(
      <Wrapper>
        <SearchUser />
      </Wrapper>,
    );

    const searchInput = screen.getByTestId('search-input');
    fireEvent.changeText(searchInput, 'dionisio28');

    const searchButton = screen.getByTestId('search-button');
    fireEvent.press(searchButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('UserDetails');
    });
  });

  test('should show loading indicator when searching', async () => {
    render(
      <Wrapper>
        <SearchUser />
      </Wrapper>,
    );

    const searchInput = screen.getByTestId('search-input');
    fireEvent.changeText(searchInput, 'username1321is9s912s91k9s1k');

    const searchButton = screen.getByTestId('search-button');
    fireEvent.press(searchButton);

    await waitFor(() => {
      expect(screen.getByTestId('loading-indicator')).toBeTruthy();
    });
  });

  test('should show error when user is not found', async () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({navigate: mockNavigate});

    render(
      <Wrapper>
        <SearchUser />
      </Wrapper>,
    );

    const searchInput = screen.getByTestId('search-input');
    fireEvent.changeText(searchInput, 'dionisio281231231232131123');

    const searchButton = screen.getByTestId('search-button');
    fireEvent.press(searchButton);

    await waitFor(() => {
      const error = screen.getByTestId('error-message-type-error');
      expect(error).toHaveTextContent('Usuário não encontrado');
    });
  });

  test('should show warning message when the search user is not valid', async () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({navigate: mockNavigate});

    render(
      <Wrapper>
        <SearchUser />
      </Wrapper>,
    );

    const searchInput = screen.getByTestId('search-input');
    fireEvent.changeText(searchInput, '!!@$!*#@!*&#*!@');

    const searchButton = screen.getByTestId('search-button');
    fireEvent.press(searchButton);

    await waitFor(() => {
      const error = screen.getByTestId('error-message-type-warning');
      expect(error).toHaveTextContent(
        'O nome de usuário só pode conter letras, números, hífens e sublinhados, e não pode começar ou terminar com hífen.',
      );
    });
  });

  test('should show warning message when the search user is empty', async () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({navigate: mockNavigate});

    render(
      <Wrapper>
        <SearchUser />
      </Wrapper>,
    );

    const searchButton = screen.getByTestId('search-button');
    fireEvent.press(searchButton);

    await waitFor(() => {
      const error = screen.getByTestId('error-message-type-warning');
      expect(error).toHaveTextContent(
        'Insira o nome de usuário para fazer a pesquisa',
      );
    });
  });

  test('should show warning message when the search username has invalid size', async () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({navigate: mockNavigate});

    render(
      <Wrapper>
        <SearchUser />
      </Wrapper>,
    );

    const searchInput = screen.getByTestId('search-input');
    fireEvent.changeText(
      searchInput,
      '123123123123123123123123123123123123123123123123123123123123123123123123123123123123123132123',
    );

    const searchButton = screen.getByTestId('search-button');
    fireEvent.press(searchButton);

    await waitFor(() => {
      const error = screen.getByTestId('error-message-type-warning');
      expect(error).toHaveTextContent(
        'O nome de usuário deve ter entre 1 e 39 caracteres',
      );
    });
  });
});
