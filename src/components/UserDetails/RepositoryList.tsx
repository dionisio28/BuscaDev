import React from 'react';
import {ActivityIndicator, Alert, FlatList, Linking} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import {Repository} from '../../types/RepoTypes';
import {scale} from '../../utils/platformUtils';
import {Colors} from '../../styles/colors';
import {formatDate, formatNumber} from '../../utils/format';
import {useUser} from '../../hooks/useGitHub';

interface RepositoryListProps {
  repos: Repository[];
}

const RepositoryList = ({repos}: RepositoryListProps) => {
  const {loading} = useUser();

  const handlePress = async (html_url: string) => {
    try {
      if (html_url) {
        await Linking.openURL(html_url);
      } else {
        Alert.alert('Erro', 'URL do repositório não encontrada.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível abrir o link.');
    }
  };

  const renderItem = ({item}: {item: Repository}) => {
    return (
      <Container onPress={() => handlePress(item.html_url)} activeOpacity={0.6}>
        <RepoName>{item.name}</RepoName>
        <RepoDescription>{item.description}</RepoDescription>

        <RepoInfo>
          <LanguageIndicator>
            <LanguageText>{item.language || 'L. Desconhecida'}</LanguageText>
          </LanguageIndicator>
          <Stars>
            <MaterialIcons name="star" size={16} color={Colors.warning} />
            <StarCount>{formatNumber(item.stargazers_count)}</StarCount>
          </Stars>
          <UpdatedText>Atualizado em {formatDate(item.updated_at)}</UpdatedText>
        </RepoInfo>
        <Line />
      </Container>
    );
  };

  return (
    <FlatList
      testID="repository-list"
      keyExtractor={item => String(item.id)}
      data={repos}
      scrollEnabled={false}
      onScrollEndDrag={() => Alert.alert('a')}
      renderItem={renderItem}
      initialNumToRender={4}
      ListFooterComponent={
        loading ? (
          <ActivityIndicator
            testID="loading-indicator"
            size="small"
            color={Colors.info}
          />
        ) : null
      }
    />
  );
};

const Container = styled.TouchableOpacity`
  margin-top: ${scale(8)}px;
`;

const RepoName = styled.Text`
  font-size: ${scale(18)}px;
  padding-bottom: ${scale(8)}px;
  color: ${Colors.black};
  font-weight: 500;
`;

const RepoDescription = styled.Text`
  font-size: ${scale(16)}px;
  margin-bottom: ${scale(8)}px;
  color: ${Colors.lightBlack};
`;

const RepoInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LanguageIndicator = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LanguageText = styled.Text`
  font-size: 14px;
  color: ${Colors.lightBlack};
`;

const StarCount = styled.Text`
  font-size: ${scale(14)}px;
  color: ${Colors.black};
  margin-left: 4px;
`;

const Stars = styled.View`
  flex-direction: row;
  align-items: center;
`;

const UpdatedText = styled.Text`
  font-size: ${scale(12)}px;
  color: ${Colors.lightGray};
`;

const Line = styled.View`
  margin-top: ${scale(8)}px;
  margin-bottom: ${scale(8)}px;
  height: 1px;
  background-color: ${Colors.opacityGray};
  width: 100%;
  align-items: center;
`;

export default RepositoryList;
