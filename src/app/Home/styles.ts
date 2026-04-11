
import { StyleSheet } from 'react-native';
import { NovoOrcamento } from '../NovoOrcamento';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f6fa',
        paddingTop: 40,
    },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: '#6644eb',
    },
    headerSubtitle: {
        fontSize: 13,
        color: '#888888',
        marginTop: 2,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    novoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#6644eb',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 24,
    },
    novoButtonText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 14,
    },
    limparButton: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#d0d2d8',
    },
    limparButtonText: {
        color: '#555555',
        fontWeight: '600',
        fontSize: 14,
    },

    // Search
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        gap: 10,
        marginBottom: 12,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ececec',
        borderRadius: 24,
        paddingHorizontal: 14,
        paddingVertical: 10,
        gap: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#222222',
    },
    sortButton: {
        backgroundColor: '#ececec',
        padding: 12,
        borderRadius: 24,
    },

    // Filters
    filtersScrollView: {
        flexGrow: 0,
    },
    filtersScroll: {
        paddingHorizontal: 20,
        gap: 8,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },

    // List
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 32,
    },
    emptyText: {
        textAlign: 'center',
        color: '#aaaaaa',
        marginTop: 48,
        fontSize: 14,
    },
    tituloInput: {
        marginTop: 8,
        backgroundColor: '#ececec',
        borderRadius: 24,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 14,
        color: '#222222',
    },
    formContainer: {
        paddingHorizontal: 20,
        marginBottom: 16,
        gap: 12,
    },
    actionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    novoOrcamento: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#6644eb',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 24,
    },

    // Modal de filtros
    filtroOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'flex-end',
    },
    filtroContainer: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
    },
    filtroHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    filtroTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    filtroSectionLabel: {
        fontSize: 13,
        color: '#999999',
        fontWeight: '600',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    filtroCheckRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 8,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#cccccc',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    checkboxActive: {
        backgroundColor: '#6644eb',
        borderColor: '#6644eb',
    },
    filtroRadioRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 10,
    },
    radio: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: '#cccccc',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    radioActive: {
        borderColor: '#6644eb',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#6644eb',
    },
    filtroRadioLabel: {
        fontSize: 15,
        color: '#1a1a1a',
    },
    filtroActions: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 24,
    },
    resetarButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: '#6644eb',
        borderRadius: 28,
        height: 46,
    },
    resetarText: {
        color: '#6644eb',
        fontWeight: '600',
        fontSize: 15,
    },
    aplicarButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6644eb',
        borderRadius: 28,
        height: 46,
        gap: 6,
    },
    aplicarText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 15,
    },
});
