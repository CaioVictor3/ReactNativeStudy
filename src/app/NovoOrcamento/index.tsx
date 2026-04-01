import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react-native';
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
};

export function NovoOrcamento({ onSave, onClose }: Props) {
  const [titulo, setTitulo] = useState('');
  const [cliente, setCliente] = useState('');
  const [percentualDesconto, setPercentualDesconto] = useState('');
  const [itens, setItens] = useState<ItemServico[]>([]);

  // Campos do formulário de item
  const [descricaoItem, setDescricaoItem] = useState('');
  const [quantidadeItem, setQuantidadeItem] = useState('');
  const [precoItem, setPrecoItem] = useState('');

  const subtotal = itens.reduce(
    (acc, item) => acc + item.quantidade * item.precoUnitario,
    0
  );
  const desconto = percentualDesconto
    ? subtotal * (Number(percentualDesconto) / 100)
    : 0;
  const total = subtotal - desconto;

  function handleAdicionarItem() {
    if (!descricaoItem.trim() || !quantidadeItem || !precoItem) {
      Alert.alert('Atenção', 'Preencha todos os campos do item.');
      return;
    }

    const novoItem: ItemServico = {
      id: Date.now().toString(),
      descricao: descricaoItem.trim(),
      quantidade: Number(quantidadeItem),
      precoUnitario: Number(precoItem),
    };

    setItens(prev => [...prev, novoItem]);
    setDescricaoItem('');
    setQuantidadeItem('');
    setPrecoItem('');
  }

  function handleRemoverItem(id: string) {
    setItens(prev => prev.filter(item => item.id !== id));
  }

  function handleSalvar() {
    if (!titulo.trim()) {
      Alert.alert('Atenção', 'Informe o título do orçamento.');
      return;
    }

    const novoOrcamento: Orcamento = {
      id: Date.now().toString(),
      titulo: titulo.trim(),
      cliente: cliente.trim(),
      itens,
      percentualDesconto: Number(percentualDesconto) || 0,
      status: StatusOrcamento.RASCUNHO,
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
    };

    onSave(novoOrcamento);
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
        <Text style={styles.headerTitle}>Novo Orçamento</Text>
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

        {/* Itens de serviço */}
        <Text style={styles.sectionTitle}>Itens de Serviço</Text>

        <View style={styles.itemForm}>
          <Input
            placeholder="Descrição do serviço"
            placeholderTextColor="#aaaaaa"
            value={descricaoItem}
            onChangeText={setDescricaoItem}
            style={styles.input}
          />
          <View style={styles.itemRow}>
            <Input
              placeholder="Qtd"
              placeholderTextColor="#aaaaaa"
              value={quantidadeItem}
              onChangeText={setQuantidadeItem}
              keyboardType="numeric"
              style={[styles.input, styles.inputSmall]}
            />
            <Input
              placeholder="Preço unitário"
              placeholderTextColor="#aaaaaa"
              value={precoItem}
              onChangeText={setPrecoItem}
              keyboardType="decimal-pad"
              style={[styles.input, styles.inputFlex]}
            />
          </View>
          <TouchableOpacity style={styles.addItemButton} onPress={handleAdicionarItem}>
            <Plus size={16} color="#ffffff" />
            <Text style={styles.addItemText}>Adicionar Item</Text>
          </TouchableOpacity>
        </View>

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
                  <TouchableOpacity onPress={() => handleRemoverItem(item.id)}>
                    <Trash2 size={16} color="#c0392b" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

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
    </KeyboardAvoidingView>
  );
}
