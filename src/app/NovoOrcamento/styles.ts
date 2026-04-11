import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: '#6644eb',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 30,
  },

  // Scroll
  scrollContent: {
    padding: 20,
  },

  // Seção
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333333',
    marginTop: 8,
    marginBottom: 10,
  },

  // Inputs
  input: {
    marginBottom: 10,
  },

  // Formulário de item
  itemForm: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  itemRow: {
    flexDirection: 'row',
    gap: 10,
  },
  inputSmall: {
    width: 80,
  },
  inputFlex: {
    flex: 1,
  },
  addItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6644eb',
    borderRadius: 8,
    paddingVertical: 10,
    gap: 6,
    marginTop: 4,
  },
  addItemText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },

  // Lista de itens adicionados
  itensList: {
    gap: 8,
    marginBottom: 16,
  },
  itemCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  itemInfo: {
    flex: 1,
  },
  itemDescricao: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  itemDetalhe: {
    fontSize: 12,
    color: '#888888',
    marginTop: 2,
  },
  itemRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  itemTotal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1a1a1a',
  },

  // Resumo financeiro
  resumo: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  resumoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  resumoLabel: {
    fontSize: 14,
    color: '#888888',
  },
  resumoValue: {
    fontSize: 14,
    color: '#1a1a1a',
  },
  resumoDesconto: {
    fontSize: 14,
    color: '#c0392b',
  },
  resumoTotalRow: {
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
    paddingTop: 8,
    marginTop: 4,
    marginBottom: 0,
  },
  resumoTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  resumoTotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6644eb',
  },

  bottomSpacing: {
    height: 32,
  },

  // Botão "Adicionar serviço"
  addServicoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#6644eb',
    borderStyle: 'dashed',
    borderRadius: 10,
    paddingVertical: 12,
    gap: 6,
    marginBottom: 16,
    backgroundColor: '#faf9ff',
  },
  addServicoText: {
    color: '#6644eb',
    fontWeight: '600',
    fontSize: 14,
  },

  // Modal de serviço
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  modalInput: {
    marginBottom: 12,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  stepperLabel: {
    fontSize: 15,
    color: '#444444',
    fontWeight: '500',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  stepperButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#dddddd',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  stepperButtonText: {
    fontSize: 20,
    color: '#333333',
    lineHeight: 24,
  },
  stepperValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    minWidth: 24,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  modalTrashButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#ffd5d5',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff5f5',
  },
  modalSaveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6644eb',
    borderRadius: 28,
    height: 46,
    gap: 8,
  },
  modalSaveText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
});
