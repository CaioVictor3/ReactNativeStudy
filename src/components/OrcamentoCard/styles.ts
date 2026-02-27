import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    left: {
        flex: 1,
        marginRight: 12,
    },
    titulo: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    cliente: {
        fontSize: 13,
        color: '#676767',
        marginBottom: 8,
    },
    valor: {
        fontSize: 13,
        color: '#1a1a1a',
    },
    valorCifrao: {
        fontSize: 12,
        color: '#888888',
    },
    right: {
        alignItems: 'flex-end',
        gap: 12,
    },
    menuButton: {
        padding: 4,
    },
});
