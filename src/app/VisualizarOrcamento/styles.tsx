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
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 52,
        paddingBottom: 16,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#222222',
    },

    // Scroll
    scrollContent: {
        padding: 16,
        paddingBottom: 110,
        gap: 12,
    },

    // Cards
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 14,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },

    // Título
    iconBox: {
        width: 46,
        height: 46,
        borderRadius: 12,
        backgroundColor: '#ede9fb',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tituloRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    titulo: {
        flex: 1,
        fontSize: 20,
        fontWeight: '700',
        color: '#1a1a1a',
        lineHeight: 26,
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginVertical: 12,
    },
    label: {
        fontSize: 12,
        color: '#999999',
        marginBottom: 2,
    },
    value: {
        fontSize: 14,
        color: '#222222',
        fontWeight: '500',
    },
    datesRow: {
        flexDirection: 'row',
        gap: 32,
        marginTop: 12,
    },

    // Serviços
    servicosTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 12,
    },
    servicosTitle: {
        fontSize: 13,
        color: '#888888',
        fontWeight: '500',
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 12,
    },
    itemInfo: {
        flex: 1,
        marginRight: 16,
    },
    itemName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    itemDesc: {
        fontSize: 12,
        color: '#888888',
        lineHeight: 17,
    },
    itemPricing: {
        alignItems: 'flex-end',
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    itemQty: {
        fontSize: 12,
        color: '#888888',
        marginTop: 2,
    },

    // Totais
    totaisRow: {
        flexDirection: 'row',
        gap: 14,
        alignItems: 'flex-start',
    },
    totaisInfo: {
        flex: 1,
    },
    totaisLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    totaisLabel: {
        fontSize: 13,
        color: '#888888',
    },
    subtotalValue: {
        fontSize: 13,
        color: '#aaaaaa',
        textDecorationLine: 'line-through',
    },
    descontoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    descontoBadge: {
        backgroundColor: '#d4f5d4',
        borderRadius: 20,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    descontoBadgeText: {
        fontSize: 11,
        color: '#2a7a2a',
        fontWeight: '700',
    },
    descontoValue: {
        fontSize: 13,
        color: '#2a7a2a',
        fontWeight: '600',
    },
    totalDivider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginVertical: 10,
    },
    totalLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    totalValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1a1a1a',
    },

    // Bottom bar
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 20,
        paddingVertical: 16,
        paddingBottom: 32,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    iconButton: {
        width: 46,
        height: 46,
        borderRadius: 23,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    shareButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6644eb',
        borderRadius: 28,
        height: 46,
        gap: 8,
    },
    shareButtonText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 15,
    },
});
