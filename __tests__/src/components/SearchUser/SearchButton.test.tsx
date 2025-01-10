import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react-native';
import SearchButton from '../../../../src/components/SearchUser/SearchButton';

describe('SearchButton', () => {
  test('should render button with correct icon and text', async () => {
    render(<SearchButton onPress={() => {}} />);

    const button = screen.getByTestId('search-button');
    expect(button).toBeTruthy();

    const icon = await screen
      .getByTestId('search-button')
      .findByProps({name: 'search'});
    expect(icon).toBeTruthy();

    const buttonText = screen.getByTestId('search-button-text');
    expect(buttonText).toHaveTextContent('Buscar perfil no Github');
  });

  test('should call onPress when button is pressed', () => {
    const onPressMock = jest.fn();
    render(<SearchButton onPress={onPressMock} />);

    fireEvent.press(screen.getByTestId('search-button'));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
