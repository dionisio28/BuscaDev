import React from 'react';
import { render, screen} from '@testing-library/react-native';
import Avatar from '../../../../src/components/UserDetails/Avatar';

test('should render Avatar component with correct image', () => {
  const avatarUrl = 'https://avatars.githubusercontent.com/u/48914458?v=4';

  render(<Avatar avatarUrl={avatarUrl} />);

  const avatarImage = screen.getByTestId('profile-image');

  expect(avatarImage).toBeTruthy();

  expect(avatarImage.props.source.uri).toBe(avatarUrl);
});
