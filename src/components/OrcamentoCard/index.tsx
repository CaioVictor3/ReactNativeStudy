import { Alert, GestureResponderEvent, Text, TouchableOpacity, View } from 'react-native';
import { MoreVertical } from 'lucide-react-native';
import { Orcamento } from '@/types/Orcamento';
import { OrcamentoIcon } from '@/components/OrcamentoIcon';
import { styles } from './styles';
import { OrcamentoStorage } from '@/storage/orcamentoStorage';

type Props = {
    orcamento: Orcamento;
};

function calcularTotal(orcamento: Orcamento): number {
    const subtotal = orcamento.itens.reduce(
        (acc, item) => acc + item.quantidade * item.precoUnitario,
        0
    );
    const desconto = orcamento.percentualDesconto
        ? subtotal * (orcamento.percentualDesconto / 100)
        : 0;
    return subtotal - desconto;
}


export function OrcamentoCard({ orcamento }: Props) {

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Text style={styles.titulo}>{orcamento.titulo}</Text>
                <Text style={styles.cliente}>{orcamento.cliente}</Text>
            </View>

            <View style={styles.right}>
                <OrcamentoIcon status={orcamento.status} />
                <Text>
                    <Text style={styles.valorCifrao}>R$ </Text>
                    <Text style={styles.valor}>{calcularTotal(orcamento).toFixed(2)}</Text>
                </Text>

                <TouchableOpacity style={styles.right}>
                    <MoreVertical size={20} color="#333" onPress={() => removerOrcamento(orcamento.id)} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
function setDescription(arg0: string) {
    throw new Error('Function not implemented.');
}

