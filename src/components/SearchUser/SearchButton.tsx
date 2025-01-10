import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import {Colors} from '../../styles/colors';
import { scale } from '../../utils/platformUtils';

interface AvatarProps {
  onPress: () => void;
}

const SearchButton = ({onPress}: AvatarProps) => {
  return (
    <Button testID="search-button" onPress={onPress}>
      <MaterialIcons name="search" size={scale(28)} color={Colors.opacityGray} />
      <ButtonTitle  testID="search-button-text">Buscar perfil no Github</ButtonTitle>
    </Button>
  );
};

const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 16px;
  background-color: ${Colors.black};
  border-radius: 10px;
  flex-direction: row;
  margin-bottom: ${scale(16)}px;
  justify-content: center;
  align-items: center;
`;

const ButtonTitle = styled.Text`
  color: ${Colors.opacityGray};
  font-size: ${scale(17)}px;
  padding-left: ${scale(4)}px;
  font-weight: bold;
`;

export default SearchButton;
