import { View, Text } from 'react-native';
import { StatusOrcamento } from '@/types/StatusOrcamento';
import { styles } from './styles';

export function OrcamentoIcon({ status }: { status: StatusOrcamento }) {
    switch (status) {
        case 'Aprovado':
            return (
                <View style={styles.aprovado}>
                    <View style={styles.aprovado_circle} />
                    <Text style={styles.aprovado_text}>Aprovado</Text>
                </View>
            );
        case 'Recusado':
            return (
                <View style={styles.recusado}>
                    <View style={styles.recusado_circle} />
                    <Text style={styles.recusado_text}>Recusado</Text>
                </View>
            );
        case 'Enviado':
            return (
                <View style={styles.enviado}>
                    <View style={styles.enviado_circle} />
                    <Text style={styles.enviado_text}>Enviado</Text>
                </View>
            );
        case 'Rascunho':
        default:
            return (
                <View style={styles.rascunho}>
                    <View style={styles.rascunho_circle} />
                    <Text style={styles.rascunho_text}>Rascunho</Text>
                </View>
            );
    }
}
