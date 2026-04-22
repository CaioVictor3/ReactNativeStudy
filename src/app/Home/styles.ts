import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { THEME } from '@/theme';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${THEME.COLORS.GRAY_6};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 0;
`;

export const HeaderLogo = styled.Text`
  font-size: ${THEME.FONT_SIZE.XL}px;
  font-weight: bold;
  color: ${THEME.COLORS.GRAY_1};
`;

export const UserAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border-width: 2px;
  border-color: ${THEME.COLORS.GRAY_2};
`;

export const PercentageCard = styled.TouchableOpacity<{ isPositivo: boolean }>`
  margin: 24px;
  background-color: ${({ isPositivo }: { isPositivo: boolean }) =>
    isPositivo ? THEME.COLORS.GREEN_LIGHT : THEME.COLORS.RED_LIGHT};
  border-radius: 8px;
  padding: 20px;
  align-items: center;
`;

export const PercentageArrow = styled.View`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const PercentageNumber = styled.Text<{ isPositivo: boolean }>`
  font-size: ${THEME.FONT_SIZE.XXL}px;
  font-weight: bold;
  color: ${({ isPositivo }: { isPositivo: boolean }) =>
    isPositivo ? THEME.COLORS.GREEN_DARK : THEME.COLORS.RED_DARK};
`;

export const PercentageLabel = styled.Text`
  font-size: ${THEME.FONT_SIZE.SM}px;
  color: ${THEME.COLORS.GRAY_2};
  margin-top: 4px;
`;

export const ListContainer = styled.View`
  flex: 1;
  padding: 0 24px;
`;

export const AddButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background-color: ${THEME.COLORS.GRAY_1};
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 32px;
`;

export const AddButtonLabel = styled.Text`
  color: ${THEME.COLORS.WHITE};
  font-size: ${THEME.FONT_SIZE.SM}px;
  font-weight: bold;
`;

export const SectionTitle = styled.Text`
  font-size: ${THEME.FONT_SIZE.LG}px;
  font-weight: bold;
  color: ${THEME.COLORS.GRAY_1};
  margin-bottom: 8px;
  margin-top: 8px;
`;

export const EmptyText = styled.Text`
  text-align: center;
  color: ${THEME.COLORS.GRAY_3};
  font-size: ${THEME.FONT_SIZE.MD}px;
  margin-top: 32px;
  line-height: 24px;
`;
