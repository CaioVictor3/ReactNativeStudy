import styled from 'styled-components/native';
import { THEME } from '@/theme';

export const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  padding: 32px;
`;

export const Box = styled.View`
  background-color: ${THEME.COLORS.WHITE};
  border-radius: 12px;
  padding: 24px;
  width: 100%;
`;

export const Title = styled.Text`
  font-size: ${THEME.FONT_SIZE.LG}px;
  font-weight: bold;
  color: ${THEME.COLORS.GRAY_1};
  margin-bottom: 8px;
`;

export const Message = styled.Text`
  font-size: ${THEME.FONT_SIZE.MD}px;
  color: ${THEME.COLORS.GRAY_3};
  line-height: 22px;
  margin-bottom: 24px;
`;

export const ButtonRow = styled.View`
  flex-direction: row;
  gap: 12px;
`;

export const CancelButton = styled.TouchableOpacity`
  flex: 1;
  padding: 14px;
  border-radius: 6px;
  border-width: 1px;
  border-color: ${THEME.COLORS.GRAY_2};
  align-items: center;
`;

export const CancelLabel = styled.Text`
  font-size: ${THEME.FONT_SIZE.SM}px;
  font-weight: bold;
  color: ${THEME.COLORS.GRAY_2};
`;

export const ConfirmButton = styled.TouchableOpacity`
  flex: 1;
  padding: 14px;
  border-radius: 6px;
  background-color: ${THEME.COLORS.GRAY_1};
  align-items: center;
`;

export const ConfirmLabel = styled.Text`
  font-size: ${THEME.FONT_SIZE.SM}px;
  font-weight: bold;
  color: ${THEME.COLORS.WHITE};
`;
