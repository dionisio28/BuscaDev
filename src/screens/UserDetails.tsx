import React from 'react';
import {View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {Colors} from '../styles/colors.ts';
import {useUser} from '../hooks/useGitHub.ts';
import {scale, STATUSBAR_HEIGHT} from '../utils/platformUtils.ts';
import UserInformation from '../components/UserDetails/UserInformation.tsx';
import Divider from '../components/UserDetails/Divider.tsx';
import InformationItem from '../components/UserDetails/InformationItem.tsx';
import RepositoryList from '../components/UserDetails/RepositoryList.tsx';

const UserDetails = () => {
  const {goBack} = useNavigation();
  const {user, repos, getMoreRepos} = useUser();

  return (
    <Scroll onScrollEndDrag={() => getMoreRepos()}>
      <Container>
        <BackIcon onPress={goBack}>
          <MaterialIcons name="arrow-back" size={28} color={Colors.black} />
        </BackIcon>
        <UserInformation user={user} />
        <Divider />
        <InformatiosRow>
          <InformationItem title={'Repositórios'} value={user.public_repos} />
          <InformationItem title={'Seguidores'} value={user.followers} />
          <InformationItem title={'Seguindo'} value={user.following} />
        </InformatiosRow>
        <Divider />
        <TextRepos>Últimos respositórios</TextRepos>
        <RepositoryList repos={repos} />
      </Container>
    </Scroll>
  );
};

const Scroll = styled.ScrollView`
  background-color: ${Colors.white};
`;
const Container = styled(View)`
  flex: 1;
  padding: ${scale(16)}px;
  padding-top: ${STATUSBAR_HEIGHT}px;
  background-color: ${Colors.white};
`;

const BackIcon = styled.TouchableOpacity`
  padding-top: 5px;
`;

const InformatiosRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const TextRepos = styled.Text`
  font-size: ${scale(20)}px;
  line-height: ${scale(20)};
  padding: ${scale(4)}px;
  padding-bottom: ${scale(16)}px;
  color: ${Colors.lightBlack};
`;

export default UserDetails;
