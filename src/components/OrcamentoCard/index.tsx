import { Alert, GestureResponderEvent, Text, TouchableOpacity, View } from 'react-native';
import { MoreVertical } from 'lucide-react-native';
import { Orcamento } from '@/types/Orcamento';
import { OrcamentoIcon } from '@/components/OrcamentoIcon';
import { styles } from './styles';
import { Orcamentotorage } from '@/storage/orcamentoStorage';

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
    
    async function selecionarOpcao(event: GestureResponderEvent): Promise<void> {
        // Aqui você pode implementar a lógica para mostrar as opções (Editar, Enviar, Excluir)
        Alert.alert('Opções', 'Escolha uma ação para este orçamento.', [
            { text: 'Rascunho', onPress: async () => {
                // await Orcamentotorage.save({ id: orcamento.id, description: orcamento, status: 'Rascunho' });
                // Alert.alert('Adicionado', `Adicionado: ${orcamento}`);
                //     setDescription('');
            }},
            { text: 'Enviado', onPress: () => {
                // Lógica para enviar
            }},
            { text: 'Aprovado', onPress: () => {
                // Lógica para aprovar
            }},
            { text: 'Recusado', onPress: () => {
                // Lógica para recusar
            }},
            { text: 'Cancelar', style: 'cancel' },
        ]);

    }

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
                    <MoreVertical size={20} color="#333" onPress={selecionarOpcao} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
function setDescription(arg0: string) {
    throw new Error('Function not implemented.');
}

