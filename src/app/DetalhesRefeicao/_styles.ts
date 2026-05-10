import { StyleSheet } from 'react-native';
import { DD_COLORS, DD_FONT_SIZE } from '@/theme/dailyDiet';

export const styles = StyleSheet.create({
  containerDentro: { flex: 1, backgroundColor: DD_COLORS.greenLight },
  containerFora: { flex: 1, backgroundColor: DD_COLORS.redLight },
  header: { padding: 24, alignItems: 'center', position: 'relative' },
  backButton: { position: 'absolute', left: 24, top: 24 },
  headerTitle: {
    fontSize: DD_FONT_SIZE.lg,
    fontWeight: 'bold',
    color: DD_COLORS.gray1,
  },
  statusBadgeDentro: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DD_COLORS.greenMid,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  statusBadgeFora: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DD_COLORS.redMid,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  statusTextDentro: {
    fontSize: DD_FONT_SIZE.xs,
    fontWeight: 'bold',
    color: DD_COLORS.greenDark,
  },
  statusTextFora: {
    fontSize: DD_FONT_SIZE.xs,
    fontWeight: 'bold',
    color: DD_COLORS.redDark,
  },
  content: {
    flex: 1,
    backgroundColor: DD_COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingTop: 40,
  },
  infoSection: { marginBottom: 24 },
  infoLabel: {
    fontSize: DD_FONT_SIZE.sm,
    fontWeight: 'bold',
    color: DD_COLORS.gray3,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: { fontSize: DD_FONT_SIZE.lg, color: DD_COLORS.gray2 },
  buttonsArea: { gap: 12, marginTop: 8 },
});
