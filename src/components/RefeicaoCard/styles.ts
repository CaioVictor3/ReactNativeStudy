import styled from 'styled-components/native';
import { THEME } from '@/theme';

type D = { dentroODieta: boolean };

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 14px 16px;
  border-width: 1px;
  border-color: ${THEME.COLORS.GRAY_5};
  border-radius: 6px;
  margin-bottom: 8px;
  background-color: ${THEME.COLORS.WHITE};
`;

export const Hora = styled.Text`
  color: ${THEME.COLORS.GRAY_1};
  font-size: ${THEME.FONT_SIZE.XS}px;
  font-weight: bold;
`;

export const Separator = styled.View`
  width: 1px;
  height: 14px;
  background-color: ${THEME.COLORS.GRAY_4};
  margin: 0 12px;
`;

export const Nome = styled.Text`
  flex: 1;
  color: ${THEME.COLORS.GRAY_2};
  font-size: ${THEME.FONT_SIZE.MD}px;
`;

export const StatusDot = styled.View<D>`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background-color: ${(p: D) =>
    p.dentroODieta ? THEME.COLORS.GREEN_DARK : THEME.COLORS.RED_DARK};
  margin-left: 8px;
`;
