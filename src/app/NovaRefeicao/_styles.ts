import { StyleSheet } from 'react-native';
import { DD_COLORS, DD_FONT_SIZE } from '@/theme/dailyDiet';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: DD_COLORS.gray5 },
  header: { padding: 24, alignItems: 'center', position: 'relative' },
  backButton: { position: 'absolute', left: 24, top: 24 },
  title: { fontSize: DD_FONT_SIZE.lg, fontWeight: 'bold', color: DD_COLORS.gray1 },
  content: {
    flex: 1,
    backgroundColor: DD_COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingTop: 40,
  },
  row: { flexDirection: 'row' },
  dietLabel: {
    fontSize: DD_FONT_SIZE.sm,
    fontWeight: 'bold',
    color: DD_COLORS.gray2,
    marginBottom: 8,
  },
  dietRow: { flexDirection: 'row', gap: 8, marginBottom: 24 },
  dietOptionBase: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 6,
    gap: 8,
    borderWidth: 1,
  },
  dietOptionDefault: {
    backgroundColor: DD_COLORS.gray6,
    borderColor: DD_COLORS.gray5,
  },
  dietOptionSim: {
    backgroundColor: DD_COLORS.greenLight,
    borderColor: DD_COLORS.greenDark,
  },
  dietOptionNao: {
    backgroundColor: DD_COLORS.redLight,
    borderColor: DD_COLORS.redDark,
  },
  dietDotSim: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: DD_COLORS.greenDark,
  },
  dietDotNao: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: DD_COLORS.redDark,
  },
  dietOptionLabel: {
    fontSize: DD_FONT_SIZE.sm,
    fontWeight: 'bold',
    color: DD_COLORS.gray1,
  },
});
