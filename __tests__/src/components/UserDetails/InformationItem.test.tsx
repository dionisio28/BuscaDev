import React from 'react';
import {render, screen} from '@testing-library/react-native';
import InformationItem from '../../../../src/components/UserDetails/InformationItem';

describe('InformationItem', () => {
  const title = 'Followers';

  test('should render InformationItem with value without suffix', () => {
    render(<InformationItem value={500} title={title} />);
    expect(screen.getByTestId('information-item-value')).toHaveTextContent(
      '500',
    );
  });

  test('should render InformationItem with value with K suffix', () => {
    render(<InformationItem value={1500} title={title} />);
    expect(screen.getByTestId('information-item-value')).toHaveTextContent(
      '1.5K',
    );
  });

  test('should render InformationItem with value with M suffix', () => {
    render(<InformationItem value={2500000} title={title} />);
    expect(screen.getByTestId('information-item-value')).toHaveTextContent(
      '2.5M',
    );
  });

  test('should render InformationItem with value with B suffix', () => {
    render(<InformationItem value={3000000000} title={title} />);
    expect(screen.getByTestId('information-item-value')).toHaveTextContent(
      '3B',
    );
  });

  test('should render InformationItem with value with T suffix', () => {
    render(<InformationItem value={4000000000000} title={title} />);
    expect(screen.getByTestId('information-item-value')).toHaveTextContent(
      '4T',
    );
  });

  test('should render InformationItem with correct title', () => {
    render(<InformationItem value={500} title={title} />);
    expect(screen.getByTestId('information-item-title')).toHaveTextContent(
      title,
    );
  });
});
