import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { THEME } from '@/theme';

type P = { $isPositivo: boolean };
type CardProps = { $color?: 'green' | 'red'; $half?: boolean };

export const Container = styled(SafeAreaView)<P>`
  flex: 1;
  background-color: ${(p: P) =>
    p.$isPositivo ? THEME.COLORS.GREEN_LIGHT : THEME.COLORS.RED_LIGHT};
`;

export const Header = styled.View`
  padding: 24px;
  align-items: center;
  position: relative;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 24px;
  top: 24px;
`;

export const PercentageNumber = styled.Text<P>`
  font-size: ${THEME.FONT_SIZE.XXL}px;
  font-weight: bold;
  color: ${(p: P) =>
    p.$isPositivo ? THEME.COLORS.GREEN_DARK : THEME.COLORS.RED_DARK};
`;

export const PercentageLabel = styled.Text`
  font-size: ${THEME.FONT_SIZE.SM}px;
  color: ${THEME.COLORS.GRAY_2};
  margin-top: 4px;
`;

export const CardsArea = styled.View`
  flex: 1;
  background-color: ${THEME.COLORS.WHITE};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 33px 24px 24px;
`;

export const CardRow = styled.View`
  flex-direction: row;
  gap: 12px;
`;

export const StatCard = styled.View<CardProps>`
  flex: ${(p: CardProps) => (p.$half ? 1 : 0)};
  background-color: ${(p: CardProps) => {
    if (p.$color === 'green') return THEME.COLORS.GREEN_LIGHT;
    if (p.$color === 'red') return THEME.COLORS.RED_LIGHT;
    return THEME.COLORS.GRAY_6;
  }};
  border-radius: 8px;
  padding: 16px;
  align-items: center;
  margin-bottom: 12px;
`;

export const StatNumber = styled.Text`
  font-size: ${THEME.FONT_SIZE.XL}px;
  font-weight: bold;
  color: ${THEME.COLORS.GRAY_1};
`;

export const StatLabel = styled.Text`
  font-size: ${THEME.FONT_SIZE.XS}px;
  color: ${THEME.COLORS.GRAY_3};
  text-align: center;
  margin-top: 4px;
  line-height: 18px;
`;
