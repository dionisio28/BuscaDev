import React, {useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import SearchInput from '../components/SearchUser/SearchInput.tsx';
import {Colors} from '../styles/colors.ts';
import styled from 'styled-components/native';
import {useUser} from '../hooks/useGitHub.ts';
import SearchButton from '../components/SearchUser/SearchButton.tsx';
import Message from '../components/Message.tsx';
import {scale} from '../utils/platformUtils';

const SearchUser = () => {
  const [searchUsername, setSearchUsername] = useState('');

  const {getUser, loading, error, typeError} = useUser();

  const onHandleSearchUsernamePress = async () => {
    await getUser(searchUsername.trim());
  };

  return (
    <Container>
      <Title>Buscador de perfil no Github</Title>
      <InstructionsText>
        Digite o nome de um usuário do GitHub para ver seus detalhes e
        repositórios.
      </InstructionsText>

      <SearchInput
        placeholder="Digite o nome de usuário do github"
        value={searchUsername}
        onChangeText={setSearchUsername}
        onSubmitEditing={onHandleSearchUsernamePress}
      />


      <SearchButton onPress={onHandleSearchUsernamePress} />

      {loading && <ActivityIndicator size={'large'} color={Colors.info} />}
      {!loading && error && <Message message={error} type={typeError} />}
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  padding: ${scale(16)}px;
  padding-top: ${scale(72)}px;
  background-color: ${Colors.white};
`;

const Title = styled(Text)`
  font-size: ${scale(30)}px;
  line-height: ${scale(42)}px;
  color: ${Colors.black};
  font-weight: 500;
  text-align: center;
`;

const InstructionsText = styled(Text)`
  font-size: ${scale(16)}px;
  color: ${Colors.lightBlack};
  line-height: ${scale(24)}px;
  text-align: center;
  margin-top: ${scale(24)}px;
`;

export default SearchUser;
