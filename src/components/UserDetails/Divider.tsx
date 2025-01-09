import React from 'react';
import {Colors} from '../../styles/colors';
import styled from 'styled-components/native';
import { scale } from '../../utils/platformUtils';

const Divider: React.FC = () => {
  return <Line />;
};

const Line = styled.View`
  padding: 1px;
  width: 100%;
  align-self: center;
  background-color: ${Colors.opacityGray};
  margin: ${scale(16)}px;
`;

export default Divider;
