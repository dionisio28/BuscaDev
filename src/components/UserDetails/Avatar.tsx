import React from 'react';
import {scale} from '../../utils/platformUtils';
import styled from 'styled-components/native';
import { Colors } from '../../styles/colors';

interface AvatarProps {
  avatarUrl: string;
}

const Avatar = ({avatarUrl}: AvatarProps) => {
  return <UserAvatarImage resizeMode="cover" source={{uri: avatarUrl}} />;
};

const UserAvatarImage = styled.Image`
  width: ${scale(165)}px;
  right: ${scale(3)}px;
  height: ${scale(250)}px;
  border-width: 1px;
  border-color: ${Colors.opacityGray};
  border-radius: 12px;
  align-self: center;
`;

export default Avatar;
