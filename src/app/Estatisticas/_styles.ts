import { StyleSheet } from 'react-native';
import { DD_COLORS, DD_FONT_SIZE } from '@/theme/dailyDiet';

export const styles = StyleSheet.create({
  containerPositivo: { flex: 1, backgroundColor: DD_COLORS.greenLight },
  containerNegativo: { flex: 1, backgroundColor: DD_COLORS.redLight },
  header: { padding: 24, alignItems: 'center', position: 'relative' },
  backButton: { position: 'absolute', left: 24, top: 24 },
  percentageNumberPositivo: {
    fontSize: DD_FONT_SIZE.xxl,
    fontWeight: 'bold',
    color: DD_COLORS.greenDark,
  },
  percentageNumberNegativo: {
    fontSize: DD_FONT_SIZE.xxl,
    fontWeight: 'bold',
    color: DD_COLORS.redDark,
  },
  percentageLabel: {
    fontSize: DD_FONT_SIZE.sm,
    color: DD_COLORS.gray2,
    marginTop: 4,
  },
  cardsArea: {
    flex: 1,
    backgroundColor: DD_COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingTop: 33,
  },
  cardRow: { flexDirection: 'row', gap: 12 },
  statCard: {
    alignSelf: 'stretch',
    backgroundColor: DD_COLORS.gray6,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  statCardGreen: {
    alignSelf: 'stretch',
    backgroundColor: DD_COLORS.greenLight,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  statCardRed: {
    alignSelf: 'stretch',
    backgroundColor: DD_COLORS.redLight,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: DD_FONT_SIZE.xl,
    fontWeight: 'bold',
    color: DD_COLORS.gray1,
  },
  statLabel: {
    fontSize: DD_FONT_SIZE.xs,
    color: DD_COLORS.gray3,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
  },
});
