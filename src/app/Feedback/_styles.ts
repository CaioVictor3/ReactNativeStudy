import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  titleDentro: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.green[500],
    textAlign: 'center',
    marginBottom: 8,
  },
  titleFora: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.red[400],
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: colors.gray[500],
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  illustration: {
    fontSize: 120,
    marginBottom: 40,
  },
  backButton: {
    borderWidth: 1,
    borderColor: colors.gray[600],
    borderRadius: 6,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  backButtonLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.gray[600],
  },
});
