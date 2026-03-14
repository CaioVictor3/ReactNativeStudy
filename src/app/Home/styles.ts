
import { StyleSheet } from 'react-native';

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
    novoButtonText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 15,
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
    novoButton: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#6644eb',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 24,
    },
});
