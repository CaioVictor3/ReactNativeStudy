import { StyleSheet } from 'react-native';
import { DD_COLORS, DD_FONT_SIZE } from '@/theme/dailyDiet';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: DD_COLORS.gray6 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    paddingBottom: 0,
  },
  headerLogo: {
    fontSize: DD_FONT_SIZE.xl,
    fontWeight: 'bold',
    color: DD_COLORS.gray1,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: DD_COLORS.gray2,
  },
  percentageCardPositivo: {
    margin: 24,
    backgroundColor: DD_COLORS.greenLight,
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  percentageCardNegativo: {
    margin: 24,
    backgroundColor: DD_COLORS.redLight,
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  percentageArrow: { position: 'absolute', top: 8, right: 8 },
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
  listContainer: { flex: 1, paddingHorizontal: 24 },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: DD_COLORS.gray1,
    borderRadius: 6,
    padding: 16,
    marginBottom: 32,
  },
  addButtonLabel: {
    color: DD_COLORS.white,
    fontSize: DD_FONT_SIZE.sm,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: DD_FONT_SIZE.lg,
    fontWeight: 'bold',
    color: DD_COLORS.gray1,
    marginBottom: 8,
    marginTop: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: DD_COLORS.gray3,
    fontSize: DD_FONT_SIZE.md,
    marginTop: 32,
    lineHeight: 24,
  },
});
