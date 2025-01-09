import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../../styles/colors';
import {scale} from '../../utils/platformUtils';

interface SearchInputProps {
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  onSubmitEditing: () => void;
}

const SearchInput: React.FC<SearchInputProps> = React.memo(
  ({value, placeholder = 'Search...', onChangeText, onSubmitEditing}) => {
    const handleClear = useCallback(() => {
      onChangeText('');
    }, [onChangeText]);

    return (
      <Container>
        <LeftIcon>
          <MaterialIcons
            name="person-search"
            size={28}
            color={Colors.lightBlack}
          />
        </LeftIcon>

        <Input
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {value.length > 0 && (
          <RightIcon onPress={handleClear}>
            <MaterialIcons name="clear" size={28} color={Colors.lightBlack} />
          </RightIcon>
        )}
      </Container>
    );
  },
);

export default SearchInput;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  padding: 0 10px;
  height: ${scale(56)}px;
  margin-top: ${scale(24)}px;
  margin-bottom: ${scale(16)}px;
  background-color: ${Colors.opacityGray};
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: ${scale(16)}px;
  padding: 0 10px;
`;

const RightIcon = styled.TouchableOpacity`
  padding: 5px;
`;

const LeftIcon = React.memo(styled.View`
  opacity: 0.6;
`);
