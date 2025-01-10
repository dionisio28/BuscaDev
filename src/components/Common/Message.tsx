import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import {Colors} from '../../styles/colors';
import {scale} from '../../utils/platformUtils';

interface MessageProps {
  type: 'error' | 'warning';
  message: string;
}

const Message: React.FC<MessageProps> = React.memo(({type, message}) => {
  return (
    <Container testID={`container-message-type-${type}`} type={type}>
      <MaterialIcons
        name={getIcon(type)}
        size={scale(32)}
        color={Colors.white}
      />
      <MessageContainer>
        <StyledTitle testID={`error-title-type-${type}`}>
          {getMessage(type)}
        </StyledTitle>
        <StyledMessage testID={`error-message-type-${type}`}>
          {message}
        </StyledMessage>
      </MessageContainer>
    </Container>
  );
});

export default Message;

const Container = styled.View<{type: 'error' | 'warning'}>`
  width: 100%;
  background-color: ${({type}: {type: 'error' | 'warning'}) => getColor(type)};
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  padding: ${scale(14)}px;
  margin-top: ${scale(32)}px;
`;

const MessageContainer = styled.View`
  justify-content: center;
  padding-left: ${scale(10)}px;
  width: 82%;
`;

const StyledTitle = styled.Text`
  font-size: ${scale(16)}px;
  line-height: ${scale(24)}px;
  text-align: left;
  color: ${Colors.white};
  font-weight: bold;
`;

const StyledMessage = styled.Text`
  font-size: ${scale(14)}px;
  line-height: ${scale(16)}px;
  text-align: left;
  color: ${Colors.white};
  font-weight: 600;
`;

const getColor = (type: 'error' | 'warning') => {
  switch (type) {
    case 'error':
      return 'red';
    case 'warning':
      return Colors.warning;
    default:
      return Colors.black;
  }
};

const getIcon = (type: 'error' | 'warning') => {
  switch (type) {
    case 'error':
      return 'error-outline';
    default:
      return 'warning-amber';
  }
};

const getMessage = (type: 'error' | 'warning') => {
  switch (type) {
    case 'error':
      return 'Erro!';
    default:
      return 'Alerta!';
  }
};
