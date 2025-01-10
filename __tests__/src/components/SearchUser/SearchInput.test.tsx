import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react-native';
import SearchInput from '../../../../src/components/SearchUser/SearchInput';

describe('SearchInput', () => {
  test('should render input with correct placeholder and clear button', () => {
    const onChangeTextMock = jest.fn();
    const onSubmitEditingMock = jest.fn();
    const onClearPressMock = jest.fn();

    render(
      <SearchInput
        value="Test"
        onChangeText={onChangeTextMock}
        onSubmitEditing={onSubmitEditingMock}
        onClearPress={onClearPressMock}
      />,
    );

    const input = screen.getByTestId('search-input');
    expect(input).toBeTruthy();

    const clearButton = screen.getByTestId('search-input-clear-button');
    expect(clearButton).toBeTruthy();

    fireEvent.press(clearButton);

    expect(onClearPressMock).toHaveBeenCalledTimes(1);
  });

  test('should call onSubmitEditing when input is submitted', () => {
    const onSubmitEditingMock = jest.fn();
    render(
      <SearchInput
        value="Teste"
        onChangeText={() => {}}
        onSubmitEditing={onSubmitEditingMock}
        onClearPress={() => {}}
      />,
    );

    const input = screen.getByTestId('search-input');

    fireEvent(input, 'submitEditing');
    expect(onSubmitEditingMock).toHaveBeenCalledTimes(1);
  });

  test('should call onClearPress when clear button is pressed', () => {
    const onClearPressMock = jest.fn();
    render(
      <SearchInput
        value="Test"
        onChangeText={() => {}}
        onSubmitEditing={() => {}}
        onClearPress={onClearPressMock}
      />,
    );

    const clearButton = screen.getByTestId('search-input-clear-button');
    expect(clearButton).toBeTruthy();

    fireEvent.press(clearButton);

    expect(onClearPressMock).toHaveBeenCalledTimes(1);
  });

  test('should update text when onChangeText is called', () => {
    const onChangeTextMock = jest.fn();
    render(
      <SearchInput
        value="Test"
        onChangeText={onChangeTextMock}
        onSubmitEditing={() => {}}
        onClearPress={() => {}}
      />,
    );

    fireEvent.changeText(screen.getByTestId('search-input'), 'New Text');

    expect(onChangeTextMock).toHaveBeenCalledWith('New Text');
  });
});
