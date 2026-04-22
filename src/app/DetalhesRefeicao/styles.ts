import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { THEME } from '@/theme';

type DietProp = { dentroODieta: boolean };

export const Container = styled(SafeAreaView)<DietProp>`
  flex: 1;
  background-color: ${({ dentroODieta }: DietProp) =>
    dentroODieta ? THEME.COLORS.GREEN_LIGHT : THEME.COLORS.RED_LIGHT};
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

export const HeaderTitle = styled.Text`
  font-size: ${THEME.FONT_SIZE.LG}px;
  font-weight: bold;
  color: ${THEME.COLORS.GRAY_1};
`;

export const StatusBadge = styled.View<DietProp>`
  align-self: center;
  flex-direction: row;
  align-items: center;
  background-color: ${({ dentroODieta }: DietProp) =>
    dentroODieta ? THEME.COLORS.GREEN_MID : THEME.COLORS.RED_MID};
  border-radius: 999px;
  padding: 6px 16px;
  margin-bottom: 40px;
`;

export const StatusText = styled.Text<DietProp>`
  font-size: ${THEME.FONT_SIZE.XS}px;
  font-weight: bold;
  color: ${({ dentroODieta }: DietProp) =>
    dentroODieta ? THEME.COLORS.GREEN_DARK : THEME.COLORS.RED_DARK};
`;

export const Content = styled.View`
  flex: 1;
  background-color: ${THEME.COLORS.WHITE};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 40px 24px 24px;
`;

export const InfoSection = styled.View`
  margin-bottom: 24px;
`;

export const InfoLabel = styled.Text`
  font-size: ${THEME.FONT_SIZE.SM}px;
  font-weight: bold;
  color: ${THEME.COLORS.GRAY_3};
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const InfoValue = styled.Text`
  font-size: ${THEME.FONT_SIZE.LG}px;
  color: ${THEME.COLORS.GRAY_2};
`;

export const ButtonsArea = styled.View`
  gap: 12px;
  margin-top: 8px;
`;
