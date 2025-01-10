import React from 'react';
import styled from 'styled-components/native';
import { formatNumber } from '../../utils/format';
import {scale} from '../../utils/platformUtils';
import { Colors } from '../../styles/colors';

interface InformationItemProps {
  value: number;
  title: string;
}

const InformationItem = ({value, title}: InformationItemProps) => {
  return (
    <Container>
      <Value testID="information-item-value">{formatNumber(value)}</Value>
      <Title testID="information-item-title">{title}</Title>
    </Container>
  );
};

const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: ${scale(14)}px;
  line-height: ${scale(18)}px;
  color: ${Colors.lightGray};
  align-items: center;
  justify-content: center;
`;

const Value = styled.Text`
  font-size: ${scale(24)}px;
  line-height: ${scale(28)}px;
  color: ${Colors.black};
  font-weight: 500;
  align-items: center;
  justify-content: center;
`;

export default InformationItem;
