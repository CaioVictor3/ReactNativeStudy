import { StyleSheet } from 'react-native';

const badge = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
};

const circle = {
    width: 8,
    height: 8,
    borderRadius: 4,
};

const text = {
    fontSize: 12,
    fontWeight: '600' as const,
};

export const styles = StyleSheet.create({
    // Aprovado
    aprovado: { ...badge, backgroundColor: '#bff6be' },
    aprovado_circle: { ...circle, backgroundColor: '#30752f' },
    aprovado_text: { ...text, color: '#30752f' },

    // Recusado
    recusado: { ...badge, backgroundColor: '#ffd5d5' },
    recusado_circle: { ...circle, backgroundColor: '#c0392b' },
    recusado_text: { ...text, color: '#c0392b' },

    // Enviado
    enviado: { ...badge, backgroundColor: '#cbebff' },
    enviado_circle: { ...circle, backgroundColor: '#1a7bbf' },
    enviado_text: { ...text, color: '#1a7bbf' },

    // Rascunho
    rascunho: { ...badge, backgroundColor: '#e8e8e8' },
    rascunho_circle: { ...circle, backgroundColor: '#888888' },
    rascunho_text: { ...text, color: '#666666' },
});
