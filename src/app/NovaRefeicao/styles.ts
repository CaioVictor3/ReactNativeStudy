import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { THEME } from '@/theme';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${THEME.COLORS.GRAY_5};
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

export const Title = styled.Text`
  font-size: ${THEME.FONT_SIZE.LG}px;
  font-weight: bold;
  color: ${THEME.COLORS.GRAY_1};
`;

export const Content = styled.View`
  flex: 1;
  background-color: ${THEME.COLORS.WHITE};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 40px 24px 24px;
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const DietLabel = styled.Text`
  font-size: ${THEME.FONT_SIZE.SM}px;
  font-weight: bold;
  color: ${THEME.COLORS.GRAY_2};
  margin-bottom: 8px;
`;

export const DietRow = styled.View`
  flex-direction: row;
  gap: 8px;
  margin-bottom: 24px;
`;

type DietOptionProp = { $dietType: 'sim' | 'nao'; $selected: boolean };
type DietDotProp = { $dietType: 'sim' | 'nao' };

export const DietOption = styled.TouchableOpacity<DietOptionProp>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 6px;
  gap: 8px;
  background-color: ${(p: DietOptionProp) => {
    if (!p.$selected) return THEME.COLORS.GRAY_6;
    return p.$dietType === 'sim' ? THEME.COLORS.GREEN_LIGHT : THEME.COLORS.RED_LIGHT;
  }};
  border-width: 1px;
  border-color: ${(p: DietOptionProp) => {
    if (!p.$selected) return THEME.COLORS.GRAY_5;
    return p.$dietType === 'sim' ? THEME.COLORS.GREEN_DARK : THEME.COLORS.RED_DARK;
  }};
`;

export const DietDot = styled.View<DietDotProp>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${(p: DietDotProp) =>
    p.$dietType === 'sim' ? THEME.COLORS.GREEN_DARK : THEME.COLORS.RED_DARK};
`;

export const DietOptionLabel = styled.Text`
  font-size: ${THEME.FONT_SIZE.SM}px;
  font-weight: bold;
  color: ${THEME.COLORS.GRAY_1};
`;
