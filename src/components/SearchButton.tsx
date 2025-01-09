import React from 'react';
import styled from 'styled-components/native';

interface AvatarProps {
  onPress: () => void;
}

const SearchButton = ({onPress}: AvatarProps) => {
  return (
    <Button onPress={onPress}>
      <ButtonTitle>Buscar usuário</ButtonTitle>
    </Button>
  );
};

const Button = styled.TouchableOpacity`
  width: 80%;
  padding: 16px;
  background-color: #007bff; /* Exemplo de cor de fundo */
  border-radius: 8px; /* Exemplo de borda arredondada */
  justify-content: center;
  align-items: center;
`;

const ButtonTitle = styled.Text`
  color: white; /* Cor do texto */
  font-size: 16px; /* Tamanho do texto */
  font-weight: bold; /* Peso da fonte */
`;

export default SearchButton;
