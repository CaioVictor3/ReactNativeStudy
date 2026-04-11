import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ArrowLeft, Check, Pencil, Plus, Trash2, X } from 'lucide-react-native';
import { useState } from 'react';
import { Orcamento } from '@/types/Orcamento';
import { ItemServico } from '@/types/ItemServico';
import { StatusOrcamento } from '@/types/StatusOrcamento';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { styles } from './styles';

type Props = {
  onSave: (orcamento: Orcamento) => void;
  onClose: () => void;
  initialData?: Orcamento;
};

export function NovoOrcamento({ onSave, onClose, initialData }: Props) {
  const [titulo, setTitulo] = useState(initialData?.titulo ?? '');
  const [cliente, setCliente] = useState(initialData?.cliente ?? '');
  const [percentualDesconto, setPercentualDesconto] = useState(
    initialData?.percentualDesconto ? String(initialData.percentualDesconto) : ''
  );
  const [itens, setItens] = useState<ItemServico[]>(initialData?.itens ?? []);

  // Modal de serviço
  const [modalServicoVisible, setModalServicoVisible] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [modalDescricao, setModalDescricao] = useState('');
  const [modalPreco, setModalPreco] = useState('');
  const [modalQuantidade, setModalQuantidade] = useState(1);

  const subtotal = itens.reduce(
    (acc, item) => acc + item.quantidade * item.precoUnitario,
    0
  );
  const desconto = percentualDesconto
    ? subtotal * (Number(percentualDesconto) / 100)
    : 0;
  const total = subtotal - desconto;

  function openAddServico() {
    setEditingItemId(null);
    setModalDescricao('');
    setModalPreco('');
    setModalQuantidade(1);
    setModalServicoVisible(true);
  }

  function openEditServico(item: ItemServico) {
    setEditingItemId(item.id);
    setModalDescricao(item.descricao);
    setModalPreco(String(item.precoUnitario));
    setModalQuantidade(item.quantidade);
    setModalServicoVisible(true);
  }

  function handleSalvarServico() {
    if (!modalDescricao.trim() || !modalPreco) {
      Alert.alert('Atenção', 'Preencha a descrição e o preço.');
      return;
    }
    if (editingItemId) {
      setItens(prev =>
        prev.map(it =>
          it.id === editingItemId
            ? { ...it, descricao: modalDescricao.trim(), precoUnitario: Number(modalPreco), quantidade: modalQuantidade }
            : it
        )
      );
    } else {
      const novoItem: ItemServico = {
        id: Date.now().toString(),
        descricao: modalDescricao.trim(),
        quantidade: modalQuantidade,
        precoUnitario: Number(modalPreco),
      };
      setItens(prev => [...prev, novoItem]);
    }
    setModalServicoVisible(false);
  }

  function handleRemoverServico() {
    if (editingItemId) {
      setItens(prev => prev.filter(it => it.id !== editingItemId));
    }
    setModalServicoVisible(false);
  }

  function handleSalvar() {
    if (!titulo.trim()) {
      Alert.alert('Atenção', 'Informe o título do orçamento.');
      return;
    }

    const orcamento: Orcamento = {
      id: initialData?.id ?? Date.now().toString(),
      titulo: titulo.trim(),
      cliente: cliente.trim(),
      itens,
      percentualDesconto: Number(percentualDesconto) || 0,
      status: initialData?.status ?? StatusOrcamento.RASCUNHO,
      dataCriacao: initialData?.dataCriacao ?? new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
    };

    onSave(orcamento);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <ArrowLeft size={22} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{initialData ? 'Editar Orçamento' : 'Novo Orçamento'}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Dados gerais */}
        <Text style={styles.sectionTitle}>Dados do Orçamento</Text>

        <Input
          placeholder="Título *"
          placeholderTextColor="#aaaaaa"
          value={titulo}
          onChangeText={setTitulo}
          style={styles.input}
        />
        <Input
          placeholder="Nome do cliente"
          placeholderTextColor="#aaaaaa"
          value={cliente}
          onChangeText={setCliente}
          style={styles.input}
        />
        <Input
          placeholder="Desconto (%)"
          placeholderTextColor="#aaaaaa"
          value={percentualDesconto}
          onChangeText={setPercentualDesconto}
          keyboardType="decimal-pad"
          style={styles.input}
        />

        {/* Serviços inclusos */}
        <Text style={styles.sectionTitle}>Serviços inclusos</Text>

        {itens.length > 0 && (
          <View style={styles.itensList}>
            {itens.map(item => (
              <View key={item.id} style={styles.itemCard}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemDescricao}>{item.descricao}</Text>
                  <Text style={styles.itemDetalhe}>
                    {item.quantidade}x · R$ {item.precoUnitario.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.itemRight}>
                  <Text style={styles.itemTotal}>
                    R$ {(item.quantidade * item.precoUnitario).toFixed(2)}
                  </Text>
                  <TouchableOpacity onPress={() => openEditServico(item)}>
                    <Pencil size={16} color="#6644eb" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.addServicoButton} onPress={openAddServico}>
          <Plus size={16} color="#6644eb" />
          <Text style={styles.addServicoText}>Adicionar serviço</Text>
        </TouchableOpacity>

        {/* Resumo financeiro */}
        <View style={styles.resumo}>
          <View style={styles.resumoRow}>
            <Text style={styles.resumoLabel}>Subtotal</Text>
            <Text style={styles.resumoValue}>R$ {subtotal.toFixed(2)}</Text>
          </View>
          {desconto > 0 && (
            <View style={styles.resumoRow}>
              <Text style={styles.resumoLabel}>Desconto ({percentualDesconto}%)</Text>
              <Text style={styles.resumoDesconto}>- R$ {desconto.toFixed(2)}</Text>
            </View>
          )}
          <View style={[styles.resumoRow, styles.resumoTotalRow]}>
            <Text style={styles.resumoTotalLabel}>Total</Text>
            <Text style={styles.resumoTotalValue}>R$ {total.toFixed(2)}</Text>
          </View>
        </View>

        <Button title="Salvar Orçamento" onPress={handleSalvar} />
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Modal adicionar/editar serviço */}
      <Modal
        visible={modalServicoVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalServicoVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Serviço</Text>
              <TouchableOpacity onPress={() => setModalServicoVisible(false)}>
                <X size={22} color="#444444" />
              </TouchableOpacity>
            </View>

            <Input
              placeholder="Descrição do serviço"
              placeholderTextColor="#aaaaaa"
              value={modalDescricao}
              onChangeText={setModalDescricao}
              style={styles.modalInput}
            />

            <Input
              placeholder="Preço unitário (ex: 150.00)"
              placeholderTextColor="#aaaaaa"
              value={modalPreco}
              onChangeText={setModalPreco}
              keyboardType="decimal-pad"
              style={styles.modalInput}
            />

            <View style={styles.stepperRow}>
              <Text style={styles.stepperLabel}>Quantidade</Text>
              <View style={styles.stepper}>
                <TouchableOpacity
                  style={styles.stepperButton}
                  onPress={() => setModalQuantidade(q => Math.max(1, q - 1))}
                >
                  <Text style={styles.stepperButtonText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.stepperValue}>{modalQuantidade}</Text>
                <TouchableOpacity
                  style={styles.stepperButton}
                  onPress={() => setModalQuantidade(q => q + 1)}
                >
                  <Text style={styles.stepperButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.modalActions}>
              {editingItemId && (
                <TouchableOpacity style={styles.modalTrashButton} onPress={handleRemoverServico}>
                  <Trash2 size={20} color="#e74c3c" />
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.modalSaveButton} onPress={handleSalvarServico}>
                <Check size={18} color="#ffffff" />
                <Text style={styles.modalSaveText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
