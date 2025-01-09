import React from 'react';
import {Text, View} from 'react-native';

import {Colors} from '../styles/colors.ts';
import styled from 'styled-components/native';
import {useUser} from '../hooks/useGitHub.ts';

import {scale, STATUSBAR_HEIGHT} from '../utils/platformUtils.ts';

const UserDetails = () => {

  const {user} = useUser();

  return (
    <Container>
      <NameTitle>{user.name}</NameTitle>
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  padding: ${scale(16)}px;
  padding-top: ${STATUSBAR_HEIGHT}px;
  background-color: ${Colors.white};
`;

const NameTitle = styled(Text)`
  font-size: ${scale(30)}px;
  line-height: ${scale(42)}px;
  color: ${Colors.black};
  font-weight: 500;
  text-align: center;
`;

export default UserDetails;
