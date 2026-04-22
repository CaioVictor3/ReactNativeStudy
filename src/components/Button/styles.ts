import styled from 'styled-components/native';
import { THEME } from '@/theme';

type V = { variant: 'primary' | 'secondary' };

export const Container = styled.TouchableOpacity<V>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: ${(p: V) =>
    p.variant === 'primary' ? THEME.COLORS.GRAY_1 : THEME.COLORS.WHITE};
  border-radius: 6px;
  border-width: 1px;
  border-color: ${(p: V) =>
    p.variant === 'primary' ? THEME.COLORS.GRAY_1 : THEME.COLORS.GRAY_2};
  padding: 16px;
  width: 100%;
`;

export const Label = styled.Text<V>`
  color: ${(p: V) =>
    p.variant === 'primary' ? THEME.COLORS.WHITE : THEME.COLORS.GRAY_1};
  font-size: ${THEME.FONT_SIZE.SM}px;
  font-weight: bold;
`;
