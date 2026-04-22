import styled from 'styled-components/native';
import { THEME } from '@/theme';

export const Container = styled.View`
  margin-bottom: 24px;
`;

export const Label = styled.Text`
  color: ${THEME.COLORS.GRAY_2};
  font-size: ${THEME.FONT_SIZE.SM}px;
  font-weight: bold;
  margin-bottom: 4px;
`;

export const StyledInput = styled.TextInput`
  border-width: 1px;
  border-color: ${THEME.COLORS.GRAY_5};
  border-radius: 6px;
  padding: 14px;
  font-size: ${THEME.FONT_SIZE.MD}px;
  color: ${THEME.COLORS.GRAY_1};
  background-color: ${THEME.COLORS.WHITE};
`;
