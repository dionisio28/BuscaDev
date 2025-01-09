import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import {scale} from '../../utils/platformUtils';
import {GitHubUser} from '../../types/GitHubUser';
import {Colors} from '../../styles/colors';
import Avatar from './Avatar';

interface UserCardProps {
  user: GitHubUser;
}

const UserInformation = ({user}: UserCardProps) => {
  console.log(user);
  return (
    <Container>
      <NameContainer>
        <NameTitle notExist={!user.name}>
          {user.name ?? 'Nome não informado'}
        </NameTitle>
      </NameContainer>

      <InformationPanel>
        <Avatar avatarUrl={user.avatar_url} />
        <DataContainer>
          <InformationText notExist={!user.bio}>
            {user.bio ?? 'Este perfil não possui uma biografia.'}
          </InformationText>
          <RowView>
            <MaterialIcons
              name="location-pin"
              size={scale(22)}
              color={Colors.lightGray}
            />

            <InformationText paddingLeft notExist={!user.bio}>
              {user.location ?? 'Localização não informada'}
            </InformationText>
          </RowView>

          <RowView>
            <MaterialIcons
              name="mail"
              size={scale(22)}
              color={Colors.lightGray}
            />

            <InformationText paddingLeft notExist={!user.bio}>
              {user.email ?? 'Email não encontrado'}
            </InformationText>
          </RowView>
        </DataContainer>
      </InformationPanel>
    </Container>
  );
};

const Container = styled.View``;

const NameContainer = styled.View`
  flex-direction: row;
  width: 100%;
  padding-top: ${scale(16)}px;
`;

const NameTitle = styled.Text<{notExist?: boolean}>`
  font-size: ${({notExist}: {notExist: boolean}) =>
    notExist ? scale(22) : scale(26)}px;
  line-height: ${scale(42)}px;
  color: ${({notExist}: {notExist: boolean}) =>
    notExist ? Colors.lightGray : Colors.black};
  font-weight: 500;
  text-align: left;
`;

const InformationPanel = styled.View`
  flex-direction: row;
  width: 100%;
  padding-top: ${scale(16)}px;
  justify-content: space-between;
`;

const DataContainer = styled.View`
  width: 50%;
`;

const RowView = styled.View`
  padding-top: ${scale(16)}px;
  flex-direction: row;
  align-items: center;
`;

const InformationText = styled.Text<{
  notExist?: boolean;
  paddingLeft?: boolean;
}>`
  font-size: ${({notExist}: {notExist: boolean}) =>
    notExist ? scale(14) : scale(12)}px;
  line-height: ${scale(18)}px;
  color: ${({notExist}: {notExist: boolean}) =>
    notExist ? Colors.lightGray : Colors.black};
  padding-left: ${({paddingLeft}: {paddingLeft: boolean}) =>
    paddingLeft ? scale(4) : 0}px;
`;

export default UserInformation;
