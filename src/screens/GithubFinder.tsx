import React, {useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import SearchInput from '../components/SearchInput.tsx';
import {Colors} from '../styles/colors.ts';
import styled from 'styled-components/native';
import {useUser} from '../hooks/useGitHub.ts';
import SearchButton from '../components/SearchButton.tsx';
import Message from '../components/Message.tsx';

const GithubFinder = () => {
  const [searchUsername, setSearchUsername] = useState('');

  const {getUser, loading, error, typeError, user} = useUser();

  const onHandleSearchUsernamePress = async () => {
    await getUser(searchUsername);
  };

  console.log('user', user);

  return (
    <Container>
      <SearchInput
        placeholder="Digite o nome de usuário do github"
        value={searchUsername}
        onChangeText={setSearchUsername}
      />
      {loading && <ActivityIndicator size={'large'} color={Colors.info} />}
      <InstructionsText>
        Digite o nome de um usuário do GitHub para ver seus detalhes e
        repositórios. Você também pode explorar seus seguidores e projetos!
      </InstructionsText>

      <SearchButton onPress={onHandleSearchUsernamePress} />
      {!loading && error && <Message message={error} type={typeError} />}
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  padding: 16px;
  background-color: ${Colors.white};
`;

const InstructionsText = styled(Text)`
  font-size: 14px;
  color: ${Colors.lightGray};
  text-align: center;
  margin-top: 10px;
`;

export default GithubFinder;
