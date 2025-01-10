import React from 'react';
import {render, screen} from '@testing-library/react-native';
import Message from '../../../../src/components/Common/Message';

describe('Message Component', () => {
  test('renderiza corretamente para tipo "error"', () => {
    render(<Message type="error" message="Mensagem de erro!" />);

    const container = screen.getByTestId('container-message-type-error');
    const title = screen.getByTestId('error-title-type-error');
    const message = screen.getByTestId('error-message-type-error');

    expect(container).toBeTruthy();
    expect(title).toHaveTextContent('Erro!');
    expect(message).toHaveTextContent('Mensagem de erro!');
  });

  test('renderiza corretamente para tipo "warning"', () => {
    render(<Message type="warning" message="Mensagem de aviso!" />);

    const container = screen.getByTestId('container-message-type-warning');
    const title = screen.getByTestId('error-title-type-warning');
    const message = screen.getByTestId('error-message-type-warning');

    expect(container).toBeTruthy();
    expect(title).toHaveTextContent('Alerta!');
    expect(message).toHaveTextContent('Mensagem de aviso!');
  });

  test('renderiza o ícone correto para tipo "error"', async () => {
    render(<Message type="error" message="Mensagem de erro!" />);

    const icon = await screen
      .getByTestId('container-message-type-error')
      .findByProps({
        name: 'error-outline',
      });

    expect(icon).toBeTruthy();
  });

  test('renderiza o ícone correto para tipo "warning"', async () => {
    render(<Message type="warning" message="Mensagem de aviso!" />);

    const icon = await screen
      .getByTestId('container-message-type-warning')
      .findByProps({
        name: 'warning-amber',
      });

    expect(icon).toBeTruthy();
  });

  test('exibe o texto da mensagem corretamente', () => {
    render(<Message type="warning" message="Esta é uma mensagem de teste." />);

    const message = screen.getByTestId('error-message-type-warning');

    expect(message).toHaveTextContent('Esta é uma mensagem de teste.');
  });

  test('aplica a cor correta no container com base no tipo de mensagem', () => {
    render(<Message type="error" message="Mensagem de erro!" />);

    const container = screen.getByTestId('container-message-type-error');
    expect(container.props.style).toMatchObject({backgroundColor: 'red'});
  });
});
