import { Orcamento } from "@/types/Orcamento";
import { useState } from "react";
import { Alert, Modal, View, Text, ScrollView, TouchableOpacity, Share } from "react-native";
import { styles } from "./styles";
import { ChevronLeft, ClipboardList, Copy, CreditCard, Pencil, Send, Trash2 } from "lucide-react-native";
import { OrcamentoIcon } from "@/components/OrcamentoIcon";
import { OrcamentoStorage } from "@/storage/orcamentoStorage";
import { NovoOrcamento } from "@/app/NovoOrcamento";

type Props = {
  item: Orcamento;
  onClose: () => void;
  onDelete?: () => void;
  onUpdate?: (orcamento: Orcamento) => void;
};

export default function VisualizarOrcamento({ item, onClose, onDelete, onUpdate }: Props) {
    const [orcamento, setOrcamento] = useState<Orcamento>(item);
    const [editModalVisible, setEditModalVisible] = useState(false);

    const subtotal = orcamento.itens.reduce(
        (acc, it) => acc + it.precoUnitario * it.quantidade,
        0
    );
    const desconto = orcamento.percentualDesconto
        ? (subtotal * orcamento.percentualDesconto) / 100
        : 0;
    const total = subtotal - desconto;

    function formatCurrency(value: number) {
        return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }

    const idDisplay = orcamento.id.slice(-5).toUpperCase();

    async function handleCompartilhar() {
        const linhas = orcamento.itens.map(
            (it) => `• ${it.descricao} — ${formatCurrency(it.precoUnitario)} x${it.quantidade}`
        ).join("\n");
        await Share.share({
            message: `*${orcamento.titulo}*\nCliente: ${orcamento.cliente}\n\nServiços:\n${linhas}\n\nTotal: ${formatCurrency(total)}`,
        });
    }

    function handleExcluir() {
        Alert.alert(
            'Excluir orçamento',
            `Deseja excluir "${orcamento.titulo}"? Esta ação não pode ser desfeita.`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        await OrcamentoStorage.deleteItem(orcamento.id);
                        onDelete?.();
                        onClose();
                    },
                },
            ]
        );
    }

    async function handleSalvarEdicao(updated: Orcamento) {
        await OrcamentoStorage.updateItem(updated);
        setOrcamento(updated);
        setEditModalVisible(false);
        onUpdate?.(updated);
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onClose} style={styles.backButton}>
                    <ChevronLeft size={22} color="#222222" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Orçamento #{idDisplay}</Text>
                <OrcamentoIcon status={orcamento.status} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Card de info */}
                <View style={styles.card}>
                    <View style={styles.tituloRow}>
                        <View style={styles.iconBox}>
                            <CreditCard size={22} color="#6644eb" />
                        </View>
                        <Text style={styles.titulo}>{orcamento.titulo}</Text>
                    </View>
                    <View style={styles.divider} />
                    <Text style={styles.label}>Cliente</Text>
                    <Text style={styles.value}>{orcamento.cliente}</Text>
                    <View style={styles.datesRow}>
                        <View>
                            <Text style={styles.label}>Criado em</Text>
                            <Text style={styles.value}>{orcamento.dataCriacao}</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Atualizado em</Text>
                            <Text style={styles.value}>{orcamento.dataAtualizacao}</Text>
                        </View>
                    </View>
                </View>

                {/* Card de serviços */}
                <View style={styles.card}>
                    <View style={styles.servicosTitleRow}>
                        <ClipboardList size={16} color="#6644eb" />
                        <Text style={styles.servicosTitle}>Serviços inclusos</Text>
                    </View>
                    {orcamento.itens.map((it, index) => (
                        <View key={it.id}>
                            {index > 0 && <View style={styles.divider} />}
                            <View style={styles.itemRow}>
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemName}>{it.descricao}</Text>
                                </View>
                                <View style={styles.itemPricing}>
                                    <Text style={styles.itemPrice}>{formatCurrency(it.precoUnitario)}</Text>
                                    <Text style={styles.itemQty}>Qt: {it.quantidade}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Card de totais */}
                <View style={styles.card}>
                    <View style={styles.totaisRow}>
                        <View style={styles.iconBox}>
                            <CreditCard size={20} color="#6644eb" />
                        </View>
                        <View style={styles.totaisInfo}>
                            <View style={styles.totaisLine}>
                                <Text style={styles.totaisLabel}>Subtotal</Text>
                                {desconto > 0 ? (
                                    <Text style={styles.subtotalValue}>{formatCurrency(subtotal)}</Text>
                                ) : (
                                    <Text style={styles.totalValue}>{formatCurrency(subtotal)}</Text>
                                )}
                            </View>
                            {desconto > 0 && (
                                <View style={styles.totaisLine}>
                                    <View style={styles.descontoRow}>
                                        <Text style={styles.totaisLabel}>Desconto</Text>
                                        <View style={styles.descontoBadge}>
                                            <Text style={styles.descontoBadgeText}>{orcamento.percentualDesconto}% off</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.descontoValue}>- {formatCurrency(desconto)}</Text>
                                </View>
                            )}
                            <View style={styles.totalDivider} />
                            <View style={styles.totaisLine}>
                                <Text style={styles.totalLabel}>Investimento total</Text>
                                <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
                            </View>
                        </View>
                    </View>
                </View>

            </ScrollView>

            {/* Bottom actions */}
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.iconButton} onPress={handleExcluir}>
                    <Trash2 size={20} color="#e74c3c" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Copy size={20} color="#444444" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => setEditModalVisible(true)}>
                    <Pencil size={20} color="#444444" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareButton} onPress={handleCompartilhar}>
                    <Send size={18} color="#ffffff" />
                    <Text style={styles.shareButtonText}>Compartilhar</Text>
                </TouchableOpacity>
            </View>

            {/* Modal de edição */}
            <Modal
                visible={editModalVisible}
                animationType="slide"
                onRequestClose={() => setEditModalVisible(false)}
            >
                <NovoOrcamento
                    initialData={orcamento}
                    onSave={handleSalvarEdicao}
                    onClose={() => setEditModalVisible(false)}
                />
            </Modal>
        </View>
    );
}
