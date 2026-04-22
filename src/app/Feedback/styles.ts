import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { THEME } from '@/theme';

type D = { $dentroODieta: boolean };

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${THEME.COLORS.WHITE};
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const Title = styled.Text<D>`
  font-size: ${THEME.FONT_SIZE.XL}px;
  font-weight: bold;
  color: ${(p: D) =>
    p.$dentroODieta ? THEME.COLORS.GREEN_DARK : THEME.COLORS.RED_DARK};
  text-align: center;
  margin-bottom: 8px;
`;

export const Description = styled.Text`
  font-size: ${THEME.FONT_SIZE.MD}px;
  color: ${THEME.COLORS.GRAY_3};
  text-align: center;
  line-height: 24px;
  margin-bottom: 40px;
`;

export const Illustration = styled.Text`
  font-size: 120px;
  margin-bottom: 40px;
`;

export const BackButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${THEME.COLORS.GRAY_1};
  border-radius: 6px;
  padding: 16px 32px;
`;

export const BackButtonLabel = styled.Text`
  font-size: ${THEME.FONT_SIZE.SM}px;
  font-weight: bold;
  color: ${THEME.COLORS.GRAY_1};
`;
