import { StyleSheet } from 'react-native';
import { DD_COLORS } from '@/theme/dailyDiet';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: DD_COLORS.gray5,
    borderRadius: 6,
    marginBottom: 8,
    backgroundColor: DD_COLORS.white,
  },
  hora: {
    color: DD_COLORS.gray1,
    fontSize: 12,
    fontWeight: 'bold',
  },
  separator: {
    width: 1,
    height: 14,
    backgroundColor: DD_COLORS.gray4,
    marginHorizontal: 12,
  },
  nome: {
    flex: 1,
    color: DD_COLORS.gray2,
    fontSize: 14,
  },
  statusDotSim: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: DD_COLORS.greenDark,
    marginLeft: 8,
  },
  statusDotNao: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: DD_COLORS.redDark,
    marginLeft: 8,
  },
});
