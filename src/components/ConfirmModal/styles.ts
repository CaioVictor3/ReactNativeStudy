import { StyleSheet } from 'react-native';
import { DD_COLORS, DD_FONT_SIZE } from '@/theme/dailyDiet';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  box: {
    backgroundColor: DD_COLORS.white,
    borderRadius: 12,
    padding: 24,
    width: '100%',
  },
  title: {
    fontSize: DD_FONT_SIZE.lg,
    fontWeight: 'bold',
    color: DD_COLORS.gray1,
    marginBottom: 8,
  },
  message: {
    fontSize: DD_FONT_SIZE.md,
    color: DD_COLORS.gray3,
    lineHeight: 22,
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: DD_COLORS.gray2,
    alignItems: 'center',
  },
  cancelLabel: {
    fontSize: DD_FONT_SIZE.sm,
    fontWeight: 'bold',
    color: DD_COLORS.gray2,
  },
  confirmButton: {
    flex: 1,
    padding: 14,
    borderRadius: 6,
    backgroundColor: DD_COLORS.gray1,
    alignItems: 'center',
  },
  confirmLabel: {
    fontSize: DD_FONT_SIZE.sm,
    fontWeight: 'bold',
    color: DD_COLORS.white,
  },
});
